import { Component } from '@angular/core';
import { User } from '../../interface/user.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService, private router : Router){}

  userForm : User = {
    nombres: '',
    apellidos: '',
    documento: '',
    nDocumento: '',
    nTeleforno: '',
    correo: '',
    contrasena: '',
    rol: 'cliente'
  }

  newUserClient(user : User){
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
      this.router.navigate(['/iniciarSesion'])
    } 
  }



    
  
}
