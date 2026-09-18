import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Sector = 'educacion' | 'gobernanza';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() loginExitoso = new EventEmitter<Sector>();

  sector = signal<Sector>('educacion');
  usuario = signal('');
  clave = signal('');
  mostrarClave = signal(false);
  capsActivo = signal(false);
  cargando = signal(false);

  errorUsuario = signal(false);
  errorClave = signal(false);

  avisoSector = () =>
    this.sector() === 'educacion'
      ? 'Acceso para funcionarios y directivos del sector educativo del municipio.'
      : 'Acceso para funcionarios del área de gobernanza y gestión territorial.';

  seleccionarSector(s: Sector): void {
    this.sector.set(s);
  }

  alternarMostrarClave(): void {
    this.mostrarClave.set(!this.mostrarClave());
  }

  verificarCapsLock(evento: KeyboardEvent): void {
    this.capsActivo.set(evento.getModifierState && evento.getModifierState('CapsLock'));
  }

  enviar(): void {
    const usuarioVacio = !this.usuario().trim();
    const claveVacia = !this.clave().trim();
    this.errorUsuario.set(usuarioVacio);
    this.errorClave.set(claveVacia);
    if (usuarioVacio || claveVacia) return;

    this.cargando.set(true);
    setTimeout(() => {
      this.cargando.set(false);
      this.loginExitoso.emit(this.sector());
    }, 900);
  }
}
