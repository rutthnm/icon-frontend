import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Persona } from '../../../auth/interface/user.interface';
import { Comprobante } from '../../interfaces/voucher.interface';
import { BillingService } from '../../services/billing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private billingService: BillingService
  ) {
    this.loadUser();
    if (this.user?.documento === 'RUC') {
      this.tipoCom = 'Factura';
      this.serie = 'F001';
      this.numeracion = this.billingService.nfactura;
    } else {
      this.tipoCom = 'Boleta';
      this.serie = 'B001';
      this.numeracion = this.billingService.nboleta;
    }
    this.dataComprobante();
  }
  user?: Persona;

  tipoCom?: string;
  numeracion?: number;
  serie?: string;

  comprobante?: Comprobante;

  loadUser() {
    this.user = this.authService.perfildeUsuario;
  }

  dataComprobante() {
    this.comprobante = this.billingService.DataComprobante;
  }

  newComprobante() {
    let datainitial: Comprobante = { ...this.billingService.DataComprobante };
    datainitial = {
      tipo: this.tipoCom,
      numeracion: (this.numeracion! += 1),
      serie: this.serie,
      ...this.comprobante,
    };
    this.billingService.addComprobante(datainitial);
    if (this.user?.documento === 'RUC') {
      this.billingService.datanNumeracionFacturas(this.numeracion!);
    } else {
      this.billingService.datanNumeracionBoletas(this.numeracion!);
    }
    this.router.navigate(['/comprobante']).then(() => {
      window.location.reload();
    });
  }
}
