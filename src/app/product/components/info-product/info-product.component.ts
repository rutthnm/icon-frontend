import { AfterViewInit, Component, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { infoProducto } from '../../interface/product.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { UsuarioAuth } from '../../../auth/interface/user.interface';
import { BillingService } from '../../../billing/services/billing.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.css'],
})
export class InfoProductComponent implements AfterViewInit {
  @ViewChild('BaseInput') baseInput!: ElementRef<HTMLInputElement>;
  @ViewChild('AlturaInput') alturaInput!: ElementRef<HTMLInputElement>;
  @ViewChild('CantidadInput') cantidadInput!: ElementRef<HTMLInputElement>;

  igv: number = 0.18;
  subTotal: number = 0;
  igvOfProduct: number = 0;
  total: number = 0;

  producto?: infoProducto;
  private userAuth?: UsuarioAuth;

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService: AuthService,
    private billingService: BillingService,
    private cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.loadProducto();
    this.loadUserAuth();
    this.inputValidate();
  }

  loadUserAuth() {
    this.userAuth = this.authService.usuarioLogueado;
  }

  loadProducto() {
    this.producto = this.productService.productoSelect;
    if (this.producto) {
      this.calculateTotals();
      // Forzar la detección de cambios después de asignar el producto
      this.cdr.detectChanges();
    }
  }

  calculateTotals() {
    const cantidad = parseFloat(this.cantidadInput.nativeElement.value);

    if (!cantidad || cantidad < 1) {
      this.subTotal = 0;
      this.igvOfProduct = 0;
      this.total = 0;
    } else {
      this.total = this.producto?.precio! * cantidad;
      this.igvOfProduct = this.total * this.igv;
      this.subTotal = this.total - this.igvOfProduct;
    }

    this.subTotal = parseFloat(this.subTotal.toFixed(2));
    this.igvOfProduct = parseFloat(this.igvOfProduct.toFixed(2));
    this.total = parseFloat(this.total.toFixed(2));
  }

  onCantidadChange() {
    this.calculateTotals();
  }

  validateBuy() {
    const cantidad = parseInt(this.cantidadInput?.nativeElement?.value || '1');
    if (cantidad < 1 || !cantidad) return alert('Ingresa una cantidad.');

    if (!this.userAuth) {
      alert('Crea una cuenta para continuar con tu compra.');
      this.router.navigate(['/iniciarSesion']);
    } else {
      this.router.navigate(['/pago']);
    }
  }

  inputValidate() {
    if (this.producto?.categoria === 'Letreros') {
      if (this.baseInput && this.baseInput.nativeElement) {
        this.baseInput.nativeElement.disabled = false;
      }
      if (this.alturaInput && this.alturaInput.nativeElement) {
        this.alturaInput.nativeElement.disabled = false;
      }
    } else {
      if (this.baseInput && this.baseInput.nativeElement) {
        this.baseInput.nativeElement.disabled = true;
      }
      if (this.alturaInput && this.alturaInput.nativeElement) {
        this.alturaInput.nativeElement.disabled = true;
      }
    }
  }
  
}
