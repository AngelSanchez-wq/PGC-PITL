import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from './login/login';
import { InstitucionEducativa, Instituciones } from './services/instituciones';

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

  instituciones = signal<InstitucionEducativa[]>([]);
  busquedaEdu = signal('');

  institucionesFiltradas = computed(() => {
    const termino = this.busquedaEdu().toLowerCase().trim();
    if (!termino) return this.instituciones();
    return this.instituciones().filter((i) => i.nombre.toLowerCase().includes(termino));
  });

  totalEstudiantes = computed(() =>
    this.instituciones().reduce((acc, i) => acc + (i.numero_estudiantes || 0), 0),
  );

  constructor(private institucionesService: Instituciones) {}

  ngOnInit(): void {
    this.institucionesService.getInstituciones().subscribe((data) => {
      this.instituciones.set(data);
    });
  }

  onLoginExitoso(sector: Sector): void {
    this.sectorActivo.set(sector);
    this.seccionActiva.set(sector === 'gobernanza' ? 'gobernanza' : 'inicio');
    this.sesionIniciada.set(true);
  }

  cambiarSeccion(id: Seccion): void {
    this.seccionActiva.set(id);
  }

  cerrarSesion(): void {
    this.sesionIniciada.set(false);
    this.seccionActiva.set('inicio');
    this.busquedaEdu.set('');
  }
}
