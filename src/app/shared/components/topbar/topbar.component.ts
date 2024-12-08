import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioAuth } from '../../../auth/interface/user.interface';

@Component({
  selector: 'shared-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {
  constructor(private authService: AuthService) {
    this.loadUser();
    this.nombre = this.user?.nombre;
    this.apellido = this.user?.apellido;
  }

  nombre?: string;
  apellido?: string;

  user?: UsuarioAuth;

  loadUser() {
    this.user = this.authService.usuarioLogueado;
  }
}
