import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { compras, Comprobante } from '../../interfaces/voucher.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-list-buys',
  templateUrl: './list-buys.component.html',
  styleUrls: ['./list-buys.component.css'],
})
export class ListBuysComponent {
  compras: compras[] = [];
  
  constructor(private billingService: BillingService) {
    this.loadVentas()
    console.log(this.compras)
  }
  private loadVentas() {
    this.billingService.traerCompras();

    if (!this.compras || this.compras.length === 0) {
      this.compras = this.billingService.loadComprasLocalStorage() || [];
    }
  }

  verCompra(id: string){
    this.billingService.traerUnaCompra(id)
  }
}
