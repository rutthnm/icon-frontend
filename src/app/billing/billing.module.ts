import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoucherComponent } from './components/voucher/voucher.component';
import { ListSaleComponent } from './components/list-sale/list-sale.component';
import { ListBuysComponent } from './components/list-buys/list-buys.component';
import { CardComponent } from './components/card/card.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    VoucherComponent,
    ListSaleComponent,
    CardComponent,
    ListBuysComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class BillingModule {}
