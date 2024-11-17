import { Component } from '@angular/core';
import { Comprobante } from '../../interfaces/voucher.interface';
import { BillingService } from '../../services/billing.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrl: './voucher.component.css',
})
export class VoucherComponent {
  constructor(private billinService: BillingService) {
    this.getListComprobante();
  }

  comprobante?: Comprobante;

  getListComprobante() {
    this.comprobante = this.billinService.OneDataComprobante;
  }

  generarPDF() {
    const comprobanteId = 'comprobante'; // ID del elemento HTML que se capturará
    const widthInMm = 198; // Ancho deseado en milímetros
    const heightInMm = 120; // Altura deseada en milímetros
    this.billinService.generarPDF(comprobanteId, widthInMm, heightInMm);
  }
}
