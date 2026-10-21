import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InstitucionEducativa {
  id?: number;
  nombre: string;
  zona_territorial: string;
  zona_territorial_id?: number;
  numero_estudiantes: number;
}

export interface EstadisticasEducativas {
  total_instituciones: number;
  total_estudiantes: number;
  distribucion_zonas: {
    urbana: number;
    rural: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Instituciones {
  private apiUrl = 'http://localhost:8000/api/instituciones';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista de instituciones educativas directamente desde la API MySQL/Laravel.
   * Sin datos mock o fallback.
   */
  getInstituciones(): Observable<InstitucionEducativa[]> {
    return this.http.get<InstitucionEducativa[]>(this.apiUrl);
  }

  /**
   * Registra una nueva institución educativa en el backend.
   */
  crearInstitucion(data: Omit<InstitucionEducativa, 'id'>): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  /**
   * Obtiene estadísticas consolidadas directamente desde la API.
   */
  getEstadisticas(): Observable<EstadisticasEducativas> {
    return this.http.get<EstadisticasEducativas>(`${this.apiUrl}/estadisticas`);
  }
}
