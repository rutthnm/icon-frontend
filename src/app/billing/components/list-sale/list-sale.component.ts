import { Component } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { ventas } from '../../interfaces/voucher.interface';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css'],
})
export class ListSaleComponent {
  ventas: ventas[] = [];
  filters = {
    documento: '',
    category: '',
    type: '',
    from: '',
    to: '',
  };

  constructor(private billingService: BillingService) { this.loadVentas()
    console.log(this.ventas)
   }

  loadVentas() {
    this.ventas = this.billingService.ventitas
     
    }
  }

 
