import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css'
})
export class RegisterAdminComponent {

  constructor(private authService: AuthService, private router : Router){
    this.loadUserAdmin()
  }

  userForm : User = {
    nombres: '',
    apellidos: '',
    documento: '',
    nDocumento: '',
    nTeleforno: '',
    correo: '',
    contrasena: '',
    rol: 'Admin'
  }

  usersAdmin: User [] = []

  newUserAdmin(user : User){
    if(
      !this.userForm.nombres ||
      !this.userForm.apellidos ||
      !this.userForm.documento ||
      !this.userForm.nDocumento ||
      !this.userForm.nTeleforno ||
      !this.userForm.correo ||
      !this.userForm.contrasena
    ){
      alert('Datos incompletos.')
    }
    else{
      this.authService.newUser(user)
      this.router.navigate(['/registar-admin']).then(() => {
        window.location.reload();
      }); ;
    } 
  }

  loadUserAdmin(){
    this.usersAdmin = this.authService.allUsersAdmin
  }

  deleteUserAdmin(user: User){
    this.authService.deleteUserAdmin(user)
    this.router.navigate(['/registar-admin']).then(() => {
      window.location.reload();
    }); ;
  }



}
