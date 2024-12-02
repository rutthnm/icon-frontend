import { Injectable } from '@angular/core';
import { User, UsuarioCliente } from '../interface/user.interface';
import { v4 as uuid } from 'uuid';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../environments/environments';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {
    this.loadLocalStorage();
    this.loadLocalStorageAuth();
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
    this.equalRoute(authUser);
  }

  private equalRoute(user: User) {
    if (user.rol === 'cliente')
      this.router.navigate(['/inicio']).then(() => {
        window.location.reload();
      });
    if (user.rol === 'Admin')
      this.router.navigate(['/ventas']).then(() => {
        window.location.reload();
      });
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

  nuevoUsuario(usuario: UsuarioCliente) {
    const payload = {
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      rol: usuario.rol,
      idPersona: {
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        documento: usuario.documento,
        nDocumento: usuario.nDocumento,
        telefono: usuario.nTeleforno,
      },
    };
    this.http.post(`${this.apiURL}usuarios`, payload).subscribe({
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
}