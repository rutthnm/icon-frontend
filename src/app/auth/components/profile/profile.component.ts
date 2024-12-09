import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Persona } from '../../interface/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  personaPerfil: Persona = {
    nombres: '',
    apellidos: '',
    documento: '',
    nDocumento: '',
    telefono: '',
  };

  constructor(private authService: AuthService) {
    this.loadUser();
  }

  loadUser() {
    const perfil = this.authService.perfildeUsuario;
    if (perfil) {
      this.personaPerfil = perfil;
    } else {
      const token = this.authService.usuarioLogueado?.jwt;
      if (token) {
        this.authService.perfilUsuario(token);
      }
    }
  }

  cerrarSesion() {
    let value = confirm('¿Estas seguro que deseas cerrar sesión?');
    if (!value) return;
    this.authService.cerrarSesion();
  }

  editUser(persona: Persona) {
    this.authService.editarPersona(persona);
  }
}
