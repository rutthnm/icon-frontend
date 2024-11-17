import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    InformationComponent,
    ContactComponent,
    FooterComponent,
  ],
  imports: [CommonModule, RouterModule],

  exports: [HomeComponent, FooterComponent],
})
export class StaticModule {}
