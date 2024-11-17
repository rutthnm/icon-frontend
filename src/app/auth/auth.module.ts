import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterAdminComponent } from './components/register-admin/register-admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RegisterAdminComponent,
    ProfileComponent,
    
  ],
  imports: [
    CommonModule,FormsModule
  ]
})
export class AuthModule { }
