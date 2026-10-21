import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ZonaTerritorialItem {
  id: number;
  nombre: string;
}

export interface SolicitudGobernanza {
  id?: number;
  zona_territorial_id: number;
  asunto: string;
  descripcion: string;
  estado?: string;
  created_at?: string;
  updated_at?: string;
  zona_territorial?: ZonaTerritorialItem;
}

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de solicitudes de gobernanza directamente desde MySQL/Laravel.
   * Sin datos mock ni fallback.
   */
  getSolicitudes(): Observable<SolicitudGobernanza[]> {
    return this.http.get<SolicitudGobernanza[]>(`${this.apiUrl}/solicitudes`);
  }

  /**
   * Registra una nueva solicitud de gobernanza en el backend.
   */
  crearSolicitud(solicitud: {
    zona_territorial_id: number;
    asunto: string;
    descripcion: string;
    estado?: string;
  }): Observable<{ mensaje: string; data: SolicitudGobernanza }> {
    return this.http.post<{ mensaje: string; data: SolicitudGobernanza }>(
      `${this.apiUrl}/solicitudes`,
      solicitud
    );
  }

  /**
   * Obtiene el catálogo de zonas territoriales desde la base de datos.
   */
  getZonas(): Observable<ZonaTerritorialItem[]> {
    return this.http.get<ZonaTerritorialItem[]>(`${this.apiUrl}/zonas`);
  }
}
