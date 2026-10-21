import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { expect, vi } from 'vitest';
import { App } from './app';
import { SolicitudesService } from './services/solicitudes';

describe('App Component (Gobernanza HU-09)', () => {
  let mockSolicitudesService: {
    getSolicitudes: ReturnType<typeof vi.fn>;
    crearSolicitud: ReturnType<typeof vi.fn>;
    getZonas: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockSolicitudesService = {
      getSolicitudes: vi.fn().mockReturnValue(of([])),
      getZonas: vi.fn().mockReturnValue(
        of([
          { id: 1, nombre: 'Urbana' },
          { id: 2, nombre: 'Rural' },
        ])
      ),
      crearSolicitud: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: SolicitudesService, useValue: mockSolicitudesService },
      ],
    }).compileComponents();
  });

  it('debe crear el componente correctamente', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('debe inicializar el estado por defecto sin sesión activa', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app.sesionIniciada()).toBeFalsy();
    expect(app.sectorActivo()).toBe('educacion');
    expect(app.seccionActiva()).toBe('inicio');
  });

  it('HU-09: debe rechazar envío de formulario si el asunto está vacío', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.solicitudAsunto.set('');
    app.solicitudDescripcion.set('Descripción válida');
    app.solicitudZonaId.set(1);

    app.guardarSolicitud();

    expect(app.errorFormSolicitud()).toBe('El asunto de la solicitud es obligatorio.');
    expect(mockSolicitudesService.crearSolicitud).not.toHaveBeenCalled();
  });

  it('HU-09: debe rechazar envío si la descripción está vacía', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.solicitudAsunto.set('Asunto válido');
    app.solicitudDescripcion.set('');
    app.solicitudZonaId.set(1);

    app.guardarSolicitud();

    expect(app.errorFormSolicitud()).toBe('La descripción de la solicitud es obligatoria.');
    expect(mockSolicitudesService.crearSolicitud).not.toHaveBeenCalled();
  });

  it('HU-09: debe enviar datos a la API cuando el formulario es válido', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    mockSolicitudesService.crearSolicitud.mockReturnValue(
      of({
        mensaje: 'Solicitud de gobernanza registrada exitosamente',
        data: {
          id: 5,
          zona_territorial_id: 1,
          asunto: '[Ejemplo] Prueba',
          descripcion: '[Ejemplo] Detalle',
          estado: 'Pendiente',
        },
      })
    );

    app.solicitudAsunto.set('[Ejemplo] Prueba');
    app.solicitudDescripcion.set('[Ejemplo] Detalle');
    app.solicitudZonaId.set(1);

    app.guardarSolicitud();

    expect(mockSolicitudesService.crearSolicitud).toHaveBeenCalledWith({
      zona_territorial_id: 1,
      asunto: '[Ejemplo] Prueba',
      descripcion: '[Ejemplo] Detalle',
      estado: 'Pendiente',
    });
    expect(app.solicitudAsunto()).toBe('');
    expect(app.solicitudDescripcion()).toBe('');
  });
});
