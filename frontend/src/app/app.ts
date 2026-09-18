import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Login } from './login/login';
import { InstitucionEducativa, Instituciones } from './services/instituciones';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Login],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  sesionIniciada = signal(false);
  sectorActivo = signal<'educacion' | 'gobernanza'>('educacion');

  instituciones = signal<InstitucionEducativa[]>([]);

  constructor(private institucionesService: Instituciones) {}

  ngOnInit(): void {
    this.institucionesService.getInstituciones().subscribe((data) => {
      this.instituciones.set(data);
    });
  }

  onLoginExitoso(sector: 'educacion' | 'gobernanza'): void {
    this.sectorActivo.set(sector);
    this.sesionIniciada.set(true);
  }
}
