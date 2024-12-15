import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './static/components/home/home.component';
import { InformationComponent } from './static/components/information/information.component';
import { ContactComponent } from './static/components/contact/contact.component';
import { CatalogueComponent } from './product/components/catalogue/catalogue.component';
import { ListBuysComponent } from './billing/components/list-buys/list-buys.component';
import { ListSaleComponent } from './billing/components/list-sale/list-sale.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { VoucherComponent } from './billing/components/voucher/voucher.component';
import { InfoProductComponent } from './product/components/info-product/info-product.component';
import { CardComponent } from './billing/components/card/card.component';
import { AddProductComponent } from './product/components/add-product/add-product.component';
import { RegisterAdminComponent } from './auth/components/register-admin/register-admin.component';
import { MainConfigProductComponent } from './product/components/config-product/main/main-config-product.component';
import { ListProductComponent } from './product/components/list-product/list-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: HomeComponent },
  { path: 'nosotros', component: InformationComponent },
  { path: 'contacto', component: ContactComponent },
  { path: 'catalogo', component: CatalogueComponent },
  { path: 'producto', component: InfoProductComponent },
  { path: 'pago', component: CardComponent },
  { path: 'compras', component: ListBuysComponent },
  { path: 'ventas', component: ListSaleComponent },
  { path: 'iniciarSesion', component: LoginComponent },
  { path: 'registrarse', component: RegisterComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'comprobante', component: VoucherComponent },
  { path: 'producto-lista', component: ListProductComponent },
  { path: 'producto-configuracion', component: MainConfigProductComponent },
  { path: 'producto-agregar', component: AddProductComponent },
  { path: 'registar-admin', component: RegisterAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
