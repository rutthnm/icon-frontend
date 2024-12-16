import { Component } from '@angular/core';
import { Compra } from '../../interfaces/voucher.interface';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css',
})
export class VoucherComponent {
  constructor(private billingService: BillingService) {
    this.comprobante = this.billingService.compraActual;
    if(!this.comprobante){
      this.comprobante = this.billingService.loadCompraLocalStorage()
    }
  }

  comprobante?: Compra;

  

  generarPDF() {
    const comprobanteId = 'comprobante'; // ID del elemento HTML que se capturará
    const widthInMm = 198; // Ancho deseado en milímetros
    const heightInMm = 120; // Altura deseada en milímetros
    this.billingService.generarPDF(comprobanteId, widthInMm, heightInMm);
  }
}
