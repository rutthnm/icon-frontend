import { Component, OnInit } from '@angular/core';
import { BillingService } from '../../services/billing.service';
import { Comprobante } from '../../interfaces/voucher.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../../auth/interface/user.interface';

@Component({
  selector: 'app-list-buys',
  templateUrl: './list-buys.component.html',
  styleUrls: ['./list-buys.component.css'],
})
export class ListBuysComponent implements OnInit {
  compras: Comprobante[] = [];
  filters = {
    type: '',
    category: '',
    from: '',
    to: '',
  };

  user?: User;
  ventas: Comprobante[] = [];

  constructor(
    private authService: AuthService,
    private billingService: BillingService
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.listComprobante();
    // this.filterCompras();
  }

  loadUser() {
    this.user = this.authService.userLogued;
  }

  listComprobante() {
    this.ventas = this.billingService.listComprobante;
  }

  // filterCompras() {
  //   if (this.user) {
  //     this.compras = this.ventas.filter(
  //       (comprobante) => comprobante.nDocumento === this.user?.nDocumento
  //     );
  //   }
  // }
}
