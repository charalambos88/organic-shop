import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';
import { ProductsComponent } from './shopping/products/products.component';
import { AdminOrdersComponent } from './admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuard } from './admin/services/admin-auth-guard.service';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database'; 
import { AngularFireAuthModule } from 'angularfire2/auth'; 
import { RouterModule } from '@angular/router'; 
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AdminModule,
    SharedModule,
    ShoppingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
    ])    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
