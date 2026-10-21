import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { InstitucionEducativa, Instituciones } from './services/instituciones';
import { SolicitudGobernanza, SolicitudesService, ZonaTerritorialItem } from './services/solicitudes';

type Sector = 'educacion' | 'gobernanza';
type Seccion = 'inicio' | 'educacion' | 'gobernanza' | 'territorio';

interface NavItem {
  id: Seccion;
  etiqueta: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  sesionIniciada = signal(false);
  sectorActivo = signal<Sector>('educacion');
  seccionActiva = signal<Seccion>('inicio');

  navItems: NavItem[] = [
    { id: 'inicio', etiqueta: 'Inicio' },
    { id: 'educacion', etiqueta: 'Educación' },
    { id: 'gobernanza', etiqueta: 'Gobernanza' },
    { id: 'territorio', etiqueta: 'Territorio' },
  ];

  // --- Capacidad 1: Instituciones Educativas ---
  instituciones = signal<InstitucionEducativa[]>([]);
  busquedaEdu = signal('');
  filtroZona = signal<'Todas' | 'Urbana' | 'Rural'>('Todas');
  cargandoInstituciones = signal(false);
  errorInstituciones = signal<string | null>(null);
  mensajeExito = signal<string | null>(null);

  mostrarFormulario = signal(false);
  nuevoNombre = signal('');
  nuevaZona = signal<'Urbana' | 'Rural'>('Rural');
  nuevoEstudiantes = signal<number | null>(null);
  guardando = signal(false);
  errorFormulario = signal<string | null>(null);

  // --- Capacidad 2 (HU-09): Solicitudes de Gobernanza ---
  solicitudes = signal<SolicitudGobernanza[]>([]);
  zonasDisponibles = signal<ZonaTerritorialItem[]>([]);
  cargandoSolicitudes = signal(false);
  errorSolicitudes = signal<string | null>(null);
  mensajeExitoSolicitud = signal<string | null>(null);

  // Formulario HU-09
  solicitudAsunto = signal('');
  solicitudDescripcion = signal('');
  solicitudZonaId = signal<number | null>(null);
  guardandoSolicitud = signal(false);
  errorFormSolicitud = signal<string | null>(null);

  // Computados
  institucionesFiltradas = computed(() => {
    const termino = this.busquedaEdu().toLowerCase().trim();
    const zona = this.filtroZona();

    return this.instituciones().filter((i) => {
      const coincideNombre = !termino || i.nombre.toLowerCase().includes(termino);
      const coincideZona = zona === 'Todas' || i.zona_territorial === zona;
      return coincideNombre && coincideZona;
    });
  });

  totalEstudiantes = computed(() =>
    this.instituciones().reduce((acc, i) => acc + (i.numero_estudiantes || 0), 0)
  );

  totalUrbanas = computed(
    () => this.instituciones().filter((i) => i.zona_territorial === 'Urbana').length
  );

  totalRurales = computed(
    () => this.instituciones().filter((i) => i.zona_territorial === 'Rural').length
  );

  promedioEstudiantes = computed(() => {
    const total = this.instituciones().length;
    return total > 0 ? Math.round(this.totalEstudiantes() / total) : 0;
  });

  constructor(
    private institucionesService: Instituciones,
    private solicitudesService: SolicitudesService
  ) {}

  ngOnInit(): void {
    this.cargarInstituciones();
    this.cargarZonas();
    this.cargarSolicitudes();
  }

  // --- Métodos de Instituciones ---
  cargarInstituciones(): void {
    this.cargandoInstituciones.set(true);
    this.errorInstituciones.set(null);

    this.institucionesService.getInstituciones().subscribe({
      next: (data) => {
        this.instituciones.set(data);
        this.cargandoInstituciones.set(false);
      },
      error: (err) => {
        this.cargandoInstituciones.set(false);
        this.errorInstituciones.set(
          'Error al conectar con la base de datos MySQL (Backend API no disponible).'
        );
      },
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario.set(true);
    this.errorFormulario.set(null);
  }

  cancelarFormulario(): void {
    this.mostrarFormulario.set(false);
    this.nuevoNombre.set('');
    this.nuevoEstudiantes.set(null);
    this.errorFormulario.set(null);
  }

  guardarNuevaInstitucion(): void {
    const nombre = this.nuevoNombre().trim();
    const zona = this.nuevaZona();
    const estudiantes = this.nuevoEstudiantes();

    if (!nombre) {
      this.errorFormulario.set('Por favor ingresa el nombre de la institución');
      return;
    }

    if (estudiantes === null || isNaN(estudiantes) || estudiantes < 0) {
      this.errorFormulario.set('Por favor ingresa un número válido de estudiantes (>= 0)');
      return;
    }

    this.guardando.set(true);
    this.errorFormulario.set(null);

    this.institucionesService
      .crearInstitucion({
        nombre,
        zona_territorial: zona,
        numero_estudiantes: estudiantes,
      })
      .subscribe({
        next: () => {
          this.guardando.set(false);
          this.mostrarFormulario.set(false);
          this.nuevoNombre.set('');
          this.nuevoEstudiantes.set(null);
          this.mensajeExito.set('¡Institución guardada exitosamente en MySQL!');
          setTimeout(() => this.mensajeExito.set(null), 4000);
          this.cargarInstituciones();
        },
        error: () => {
          this.guardando.set(false);
          this.errorFormulario.set('Error al guardar en MySQL. Verifica la conexión con el backend.');
        },
      });
  }

  // --- Métodos de Gobernanza (HU-09) ---
  cargarZonas(): void {
    this.solicitudesService.getZonas().subscribe({
      next: (zonas) => {
        this.zonasDisponibles.set(zonas);
        if (zonas.length > 0 && !this.solicitudZonaId()) {
          this.solicitudZonaId.set(zonas[0].id);
        }
      },
      error: () => {
        // Zonas estándar según migración
        this.zonasDisponibles.set([
          { id: 1, nombre: 'Urbana' },
          { id: 2, nombre: 'Rural' },
        ]);
        if (!this.solicitudZonaId()) {
          this.solicitudZonaId.set(1);
        }
      },
    });
  }

  cargarSolicitudes(): void {
    this.cargandoSolicitudes.set(true);
    this.errorSolicitudes.set(null);

    this.solicitudesService.getSolicitudes().subscribe({
      next: (data) => {
        this.solicitudes.set(data);
        this.cargandoSolicitudes.set(false);
      },
      error: () => {
        this.cargandoSolicitudes.set(false);
        this.errorSolicitudes.set(
          'Error al cargar solicitudes desde MySQL. Verifica que el servidor Laravel esté activo.'
        );
      },
    });
  }

  guardarSolicitud(): void {
    const asunto = this.solicitudAsunto().trim();
    const descripcion = this.solicitudDescripcion().trim();
    const zonaId = this.solicitudZonaId();

    if (!asunto) {
      this.errorFormSolicitud.set('El asunto de la solicitud es obligatorio.');
      return;
    }

    if (!descripcion) {
      this.errorFormSolicitud.set('La descripción de la solicitud es obligatoria.');
      return;
    }

    if (!zonaId) {
      this.errorFormSolicitud.set('Debes seleccionar una zona territorial válida.');
      return;
    }

    this.guardandoSolicitud.set(true);
    this.errorFormSolicitud.set(null);

    this.solicitudesService
      .crearSolicitud({
        zona_territorial_id: Number(zonaId),
        asunto,
        descripcion,
        estado: 'Pendiente',
      })
      .subscribe({
        next: () => {
          this.guardandoSolicitud.set(false);
          this.solicitudAsunto.set('');
          this.solicitudDescripcion.set('');
          this.mensajeExitoSolicitud.set(
            '¡Solicitud de gobernanza registrada exitosamente en MySQL (HU-09)!'
          );
          setTimeout(() => this.mensajeExitoSolicitud.set(null), 5000);
          this.cargarSolicitudes();
        },
        error: (err) => {
          this.guardandoSolicitud.set(false);
          const errorMsg =
            err?.error?.message ||
            err?.error?.mensaje ||
            'Error al registrar la solicitud en MySQL. Revisa los datos o el estado del backend.';
          this.errorFormSolicitud.set(errorMsg);
        },
      });
  }

  // --- Navegación y Sesión ---
  onLoginExitoso(sector: Sector): void {
    this.sectorActivo.set(sector);
    this.seccionActiva.set(sector === 'gobernanza' ? 'gobernanza' : 'inicio');
    this.sesionIniciada.set(true);
  }

  cambiarSeccion(id: Seccion): void {
    this.seccionActiva.set(id);
    if (id === 'gobernanza') {
      this.cargarSolicitudes();
    } else if (id === 'educacion') {
      this.cargarInstituciones();
    }
  }

  cerrarSesion(): void {
    this.sesionIniciada.set(false);
    this.seccionActiva.set('inicio');
    this.busquedaEdu.set('');
    this.filtroZona.set('Todas');
    this.mostrarFormulario.set(false);
  }
}
