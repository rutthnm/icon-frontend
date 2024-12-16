import { Component } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { ventas } from '../../interfaces/voucher.interface';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css'],
})
export class ListSaleComponent {
  ventas?: ventas[] = [];

  constructor(private billingService: BillingService) {
    this.loadVentas()
    console.log(this.ventas)
  }
  private loadVentas() {
    this.billingService.traerVentas();

    if (!this.ventas || this.ventas.length === 0) {
      this.ventas = this.billingService.loadVentasLocalStorage() || [];
    }
  }

  verCompra(id: string){
    this.billingService.traerUnaCompra(id)
  }
}


