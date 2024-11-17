import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interface/user.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  userProfile : User = {
    nombres: '',
    apellidos: '',
    documento: '',
    nDocumento: '',
    nTeleforno: '',
    correo: '',
    contrasena: '',
    rol: ''
  }

  constructor(private authService: AuthService){
    this.loadUser()
  }

  loadUser(){
   this.userProfile = this.authService.userLogued
   this.userProfile.contrasena = ''
  }

  logOut(){
    let value = confirm('¿Estas seguro que deseas cerrar sesión?')
    if(!value)return ;
    this.authService.logOut()
  }

  editUser(user: User){
    if(
      !this.userProfile.nombres ||
      !this.userProfile.apellidos ||
      !this.userProfile.documento ||
      !this.userProfile.nDocumento ||
      !this.userProfile.nTeleforno ||
      !this.userProfile.correo ||
      !this.userProfile.contrasena
    ){
      alert('Datos incompletos.')
    }
    else{
      let value = confirm('¿Estas seguro que quieres editar los datos?')
      this.authService.editUser(user)
    }
  }



}
