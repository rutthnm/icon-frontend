import { Component } from '@angular/core';
import { User } from '../../interface/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  userLogin: User = {
    correo: '',
    contrasena: '',
  };

  loginUser(user: User) {
    this.authService.authLogin(user);
  }
}
