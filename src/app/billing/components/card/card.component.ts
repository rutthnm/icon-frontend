import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Persona } from '../../../auth/interface/user.interface';
import { detalleCompra } from '../../interfaces/voucher.interface';
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
    } else {
      this.tipoCom = 'Boleta';
    }
    this.loadDetalle();
  }
  user?: Persona;

  tipoCom?: string;

  detalleCompra? : detalleCompra;

  loadUser() {
    this.user = this.authService.perfildeUsuario;
  }

  loadDetalle(){
    this.detalleCompra = this.billingService.getDetalleCompra();
  }

  nuevaCompra() {
    this.billingService.comprar(this.detalleCompra!);
    // this.router.navigate(['/comprobante']).then(() => {
    //   window.location.reload();
    // });
  }
}
