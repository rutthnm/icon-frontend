import { Component } from '@angular/core';
import { Usuario } from '../../interface/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  userForm: Usuario = {
    correo: '',
    contrasena: '',
    persona: {
      nombres: '',
      apellidos: '',
      documento: '',
      nDocumento: '',
      telefono: '',
    },
    rol: 'cliente',
  };

  newUserClient(user: Usuario) {
    this.authService.nuevoUsuario(user);
  }
}
