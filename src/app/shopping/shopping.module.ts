import { SharedModule } from './../shared/shared.module';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductsComponent } from './products/products.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'products', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent }, 
      { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard] },
     
    ])
  ],
  declarations: [
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ]
})
export class ShoppingModule { }
