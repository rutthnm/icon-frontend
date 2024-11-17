import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interface/product.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interface/user.interface';
import { BillingService } from '../../../billing/services/billing.service';
import { Comprobante } from '../../../billing/interfaces/voucher.interface';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.css',
})
export class InfoProductComponent implements AfterViewInit {
  @ViewChild('BaseInput')
  baseInput!: ElementRef<HTMLInputElement>;

  @ViewChild('AlturaInput')
  alturaInput!: ElementRef<HTMLInputElement>;

  @ViewChild('CantidadInput')
  cantidadInput!: ElementRef<HTMLInputElement>;

  DataProduct?: Product;

  subTotal?: number;
  igv: number = 0.18;
  igvOfProduct?: number;
  total?: number;

  private userAuth?: User

  constructor(private productService: ProductService,
      private router: Router,
      private authService: AuthService,
      private billingService: BillingService
    ) {
    this.LoadProduct();
    this.loadUserAuth()
  }

  loadUserAuth(){
    this.userAuth = this.authService.userLogued
  }

  LoadProduct() {
    this.DataProduct = this.productService.productSelected;
    this.subTotal = this.DataProduct.precio;
  }

  ngAfterViewInit() {
    this.inputValidate();
    this.calculateTotal();
  }
  

  inputValidate() {
    if (this.DataProduct?.idCategoria === 'Letreros') {
      this.baseInput.nativeElement.disabled = false;
      this.alturaInput.nativeElement.disabled = false;
    } else {
      this.baseInput.nativeElement.disabled = true;
      this.alturaInput.nativeElement.disabled = true;
    }

    this.cantidadInput.nativeElement.value = '1';
  }

  calculateTotal() {
    const cantidad = parseFloat(this.cantidadInput.nativeElement.value);

    if (!cantidad || cantidad < 0) {
      this.subTotal = 0;
      this.igvOfProduct = 0;
      this.total = 0;
      this.cantidadInput.nativeElement.value = '1';
      this.calculateTotal();
    } else {
      const price = this.DataProduct?.precio;
      this.subTotal = price! * cantidad;
      this.igvOfProduct = this.subTotal * this.igv;
      this.total = this.subTotal + this.igvOfProduct;
    }

    this.subTotal = parseFloat(this.subTotal.toFixed(2));
    this.igvOfProduct = parseFloat(this.igvOfProduct.toFixed(2));
    this.total = parseFloat(this.total.toFixed(2));
  }

  validateBuy() {
    
    const cantidad = parseInt(this.cantidadInput.nativeElement.value);

    if (cantidad < 1 || !cantidad) return alert('Ingresa una cantidad.');

    if(!this.userAuth){      
      alert('Crea una cuenta para continuar con tu compra.');
      this.router.navigate(['/iniciarSesion'])
    }else{
      this.router.navigate(['/pago']);
      this.addComprobante()
    }

  }

  addComprobante() {
    // Obtener la fecha actual
    const now = new Date();
    
    // Formatear la fecha de manera simple
    const formattedDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, '0'),
      String(now.getDate()).padStart(2, '0')
    ].join('-') + ' ' + [
      String(now.getHours()).padStart(2, '0'),
      String(now.getMinutes()).padStart(2, '0'),
      String(now.getSeconds()).padStart(2, '0')
    ].join(':');
  
    // Crear el objeto comprobante
    const newcomprobante: Comprobante = {
      nombrePersona: this.userAuth?.nombres,
      apellidos: this.userAuth?.apellidos,
      documento: this.userAuth?.documento,
      nDocumento: this.userAuth?.nDocumento,
      telefono: this.userAuth?.nTeleforno,
      fecha: formattedDate,  // Fecha y hora formateadas
      nombreProducto: this.DataProduct?.nombre,
      categoria: this.DataProduct?.idCategoria,
      cantidad: parseInt(this.cantidadInput.nativeElement.value, 10),
      subTotal: this.subTotal,
      igv: this.igvOfProduct,
      total: this.total
    };
    
    // Enviar el comprobante al servicio
    this.billingService.dataProductBuy(newcomprobante);
  }
  
  

}