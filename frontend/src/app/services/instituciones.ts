import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface InstitucionEducativa {
  id: number;
  nombre: string;
  zona_territorial: string;
  numero_estudiantes: number;
}

@Injectable({
  providedIn: 'root',
})
export class Instituciones {
  private apiUrl = 'http://localhost:8000/api/instituciones';

  constructor(private http: HttpClient) {}

  getInstituciones(): Observable<InstitucionEducativa[]> {
    return this.http.get<InstitucionEducativa[]>(this.apiUrl);
  }
}
