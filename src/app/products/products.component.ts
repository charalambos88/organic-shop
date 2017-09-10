import { Component, OnInit } from '@angular/core';
import { ProductService} from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import 'rxjs/add/operator/switchMap';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css']
})
export class ProductsComponent {
	products: Product[] = [];
	filteredProducts: Product[] = [];
	category: string;

	constructor(
		private productService: ProductService,
		route: ActivatedRoute) { 

		productService
		.getAll()
		.switchMap(products => {
			//add {} gia na teleiosei prota to this.products
			//kai meta na ksekinisei to route
			//allios tha vlepame keni selida sto start.
			this.products = products;
			return route.queryParamMap;
		})

		.subscribe(params => {
			this.category = params.get('category');

			//setting the filtered array
			this.filteredProducts = (this.category) ?
			this.products.filter(p => p.category === this.category) :
			this.products;
		});




		//we cant user snapshot, because it will the url.

	}

}
