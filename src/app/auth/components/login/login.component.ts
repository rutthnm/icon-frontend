import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../interface/login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  userLogin: LoginUser = {
    correo: '',
    contrasena: '',
  };

  loginUser(user: LoginUser) {
    this.authService.logearUsuario(user);
  }
}
