import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';

import { OrderService } from './services/order.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { UserService } from './services/user.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { FormsModule } from '@angular/forms'; 
import { CustomFormsModule } from 'ng2-validation'; 
import { DataTableModule } from 'angular-4-data-table';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
  ],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule { }
