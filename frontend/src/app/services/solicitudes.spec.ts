import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { expect } from 'vitest';
import { SolicitudGobernanza, SolicitudesService } from './solicitudes';

describe('SolicitudesService', () => {
  let service: SolicitudesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SolicitudesService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(SolicitudesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('getSolicitudes() debe hacer GET /api/solicitudes sin fallbacks', () => {
    const mockData: SolicitudGobernanza[] = [
      {
        id: 1,
        zona_territorial_id: 1,
        asunto: '[Ejemplo] Asunto 1',
        descripcion: '[Ejemplo] Descripcion 1',
        estado: 'Pendiente',
        zona_territorial: { id: 1, nombre: 'Rural' },
      },
    ];

    service.getSolicitudes().subscribe((data) => {
      expect(data.length).toBe(1);
      expect(data[0].asunto).toBe('[Ejemplo] Asunto 1');
    });

    const req = httpMock.expectOne('http://localhost:8000/api/solicitudes');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('crearSolicitud() debe hacer POST a /api/solicitudes', () => {
    const nueva = {
      zona_territorial_id: 2,
      asunto: '[Ejemplo] Nueva solicitud',
      descripcion: '[Ejemplo] Detalle de solicitud',
    };

    const respuestaMock = {
      mensaje: 'Solicitud de gobernanza registrada exitosamente',
      data: { id: 10, ...nueva, estado: 'Pendiente' },
    };

    service.crearSolicitud(nueva).subscribe((res) => {
      expect(res.mensaje).toBe('Solicitud de gobernanza registrada exitosamente');
      expect(res.data.id).toBe(10);
    });

    const req = httpMock.expectOne('http://localhost:8000/api/solicitudes');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nueva);
    req.flush(respuestaMock);
  });

  it('debe propagar el error si la API falla (prohibido fallback)', () => {
    let errorRecibido: any = null;

    service.getSolicitudes().subscribe({
      next: () => {
        expect.unreachable('No debía ser exitoso');
      },
      error: (err) => {
        errorRecibido = err;
      },
    });

    const req = httpMock.expectOne('http://localhost:8000/api/solicitudes');
    req.flush('Error de servidor', { status: 500, statusText: 'Server Error' });

    expect(errorRecibido).toBeTruthy();
    expect(errorRecibido.status).toBe(500);
  });
});
