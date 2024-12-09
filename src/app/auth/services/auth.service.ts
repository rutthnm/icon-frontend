import { Injectable } from '@angular/core';
import {
  Persona,
  User,
  Usuario,
  UsuarioAuth,
} from '../interface/user.interface';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { enviroment } from '../../../environments/environments';
import { LoginUser } from '../interface/login.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
    this.loadLocalStorage();
    this.loadLocalStorageAuth();
    this.loadLocalStorageUsuario();
    this.loadLocalStoragePersona();
  }

  private users: User[] = [
    {
      idUsuario: uuid(),
      nombres: 'nombreAd',
      apellidos: 'apellidoAd',
      documento: 'DNI',
      nDocumento: '12345678',
      nTeleforno: '987654321',
      correo: 'admin@gmail.com',
      contrasena: '12345',
      rol: 'Admin',
    },
    {
      idUsuario: uuid(),
      nombres: 'nombreCl',
      apellidos: 'apellidoCl',
      documento: 'DNI',
      nDocumento: '12584479',
      nTeleforno: '912345678',
      correo: 'cliente@gmail.com',
      contrasena: '12345',
      rol: 'cliente',
    },
    {
      idUsuario: uuid(),
      nombres: 'Benjamin',
      apellidos: 'Rojas',
      documento: 'RUC',
      nDocumento: '10725032490',
      nTeleforno: '9603220590',
      correo: 'benja@gmail.com',
      contrasena: '12345',
      rol: 'cliente',
    },
  ];

  private userAuth?: User;

  get allUsersAdmin(): User[] {
    const usersAdmin = this.users.filter((us) => us.rol === 'Admin');
    return usersAdmin;
  }

  get userLogued() {
    return this.userAuth!;
  }

  private saveLocalStorage() {
    localStorage.setItem('userList', JSON.stringify(this.users));
  }

  private loadLocalStorage() {
    if (!localStorage.getItem('userList')) return;
    this.users = JSON.parse(localStorage.getItem('userList')!);
  }

  private saveLocalStorageAuth() {
    localStorage.setItem('userLogin', JSON.stringify(this.userAuth));
  }

  loadLocalStorageAuth() {
    if (!localStorage.getItem('userLogin')) return;
    this.userAuth = JSON.parse(localStorage.getItem('userLogin')!);
    return this.userAuth;
  }

  //SE BORRA PROXIMAMENTE
  newUser(user: User) {
    const newUser: User = { idUsuario: uuid(), ...user };
    this.users.push(newUser);
    this.saveLocalStorage();
  }

  authLogin(user: User) {
    const authUser = this.users.find(
      (us) => us.correo === user.correo && us.contrasena === user.contrasena
    );
    if (!authUser) return alert('Datos incorrectos.');
    this.userAuth = authUser;
    this.saveLocalStorageAuth();
  }

  logOut() {
    localStorage.removeItem('userLogin');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  editUser(user: User) {
    if (!user) return;
    const indexUser = this.users.findIndex(
      (us) => us.idUsuario === this.userAuth?.idUsuario
    );
    this.users[indexUser] = user;
    this.saveLocalStorage();

    if (this.userAuth?.idUsuario === user.idUsuario) this.userAuth = user;
    this.saveLocalStorageAuth();

    this.router.navigate(['/perfil']).then(() => {
      window.location.reload();
    });
  }

  deleteUserAdmin(user: User) {
    this.users = this.users.filter((us) => us.idUsuario !== user.idUsuario);
    this.saveLocalStorage();
  }

  //CONSUMIENDO LA API

  private apiURL: string = enviroment.apiURL;

  private usuarioAuth?: UsuarioAuth;

  private perfilAuth?: Persona;

  nuevoUsuario(usuario: Usuario) {
    this.http.post(`${this.apiURL}usuarios`, usuario).subscribe({
      next: () => {
        this.router.navigate(['/iniciarSesion']);
      },
      error: (err) => {
        const errorMessage =
          err?.error?.message || 'Hubo un error al registrar el usuario.';
        alert(errorMessage);
      },
    });
  }

  logearUsuario(loginUser: LoginUser) {
    this.http
      .post<UsuarioAuth>(`${this.apiURL}usuarios/login`, loginUser)
      .subscribe({
        next: (response) => {
          this.usuarioAuth = response;
          localStorage.setItem('usuarioAuth', JSON.stringify(this.usuarioAuth));
          this.equalRoute(this.usuarioAuth);
          this.perfilUsuario(this.usuarioAuth.jwt);
        },
        error: (err) => {
          const errorMessage =
            err?.error?.message || 'Error al iniciar sesión.';
          alert(errorMessage);
        },
      });
  }

  private equalRoute(user: UsuarioAuth) {
    if (user.rol === 'cliente')
      this.router.navigate(['/inicio']).then(() => {
        window.location.reload();
      });
    if (user.rol === 'administrador')
      this.router.navigate(['/ventas']).then(() => {
        window.location.reload();
      });
  }

  loadLocalStorageUsuario() {
    if (!localStorage.getItem('usuarioAuth')) return;
    this.usuarioAuth = JSON.parse(localStorage.getItem('usuarioAuth')!);
    return this.usuarioAuth;
  }

  get usuarioLogueado() {
    return this.usuarioAuth;
  }

  perfilUsuario(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.http
      .get<Persona>(`${this.apiURL}personas/perfil`, { headers })
      .subscribe({
        next: (response) => {
          this.perfilAuth = response;
          localStorage.setItem('perfilAuth', JSON.stringify(this.perfilAuth));
        },
        error: (err) => {
          alert(`Datos del perfil dañado: ${err}`);
        },
      });
  }

  loadLocalStoragePersona() {
    if (!localStorage.getItem('perfilAuth')) return;
    this.perfilAuth = JSON.parse(localStorage.getItem('perfilAuth')!);
    return this.perfilAuth;
  }

  get perfildeUsuario() {
    return this.perfilAuth!;
  }

  cerrarSesion() {
    localStorage.removeItem('usuarioAuth');
    localStorage.removeItem('perfilAuth');
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }

  editarPersona(persona: Persona) {}
}
