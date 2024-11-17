import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interface/user.interface';

@Component({
  selector: 'shared-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css',
})
export class TopbarComponent {

  constructor(private authService: AuthService){
    this.loadUser()    
    this.namesUser = `${this.user?.nombres} ${this.user?.apellidos}`
  }

  namesUser?: string

  user?: User

  loadUser(){

    this.user = this.authService.userLogued
    
  }

  

}
