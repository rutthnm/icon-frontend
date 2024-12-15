import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogueComponent } from './components/catalogue/catalogue.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ConfigProductComponent } from './components/config-product/config-product.component';
import { MainConfigProductComponent } from './components/config-product/main/main-config-product.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CatalogueComponent,
    InfoProductComponent,
    ListProductComponent,
    AddProductComponent,
    ConfigProductComponent,
    MainConfigProductComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ProductModule {}
