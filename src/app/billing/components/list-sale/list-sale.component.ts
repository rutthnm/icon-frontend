import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Comprobante } from '../../interfaces/voucher.interface';

@Component({
  selector: 'app-list-sale',
  templateUrl: './list-sale.component.html',
  styleUrls: ['./list-sale.component.css'],
})
export class ListSaleComponent implements OnInit {
  ventas: Comprobante[] = [];
  filters = {
    documento: '',
    category: '',
    type: '',
    from: '',
    to: '',
  };

  constructor(private billingService: BillingService) {}

  ngOnInit(): void {
    this.applyFilters();
  }
  fetchSales() {
    this.ventas = this.billingService.listComprobante;
  }

  applyFilters(): void {
    this.fetchSales();
  }
}
