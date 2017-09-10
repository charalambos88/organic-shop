import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';
import 'rxjs/add/operator/take';

@Component({
	selector: 'app-product-form',
	templateUrl: './product-form.component.html',
	styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
	categories$;
	product = {};
	id;

	constructor(
		private categoryService: CategoryService,
		private productService: ProductService,
		private router: Router,
		private route: ActivatedRoute
		) {
		//initialize the categories$ value to getCategories, the data.
		this.categories$ = categoryService.getAll();

		//read the id parameter from the url. 
		//the user has to go to product list before coming to product form
		this.id = this.route.snapshot.paramMap.get('id');
		//if the id is valid then => read the product from firebase
		//subscribe to read the product
		//with take we get only (x - 1) value and after is complete,
		//so there is no need for un-subscribe
		if (this.id) this.productService.getProduct(this.id).take(1).subscribe(p => this.product = p);
	}

	save(product){
		if(this.id) this.productService.update(this.id, product);
		else this.productService.create(product);

		this.router.navigate(['/admin/products']);
	}

	delete(){
		if (!confirm('Are you sure you want to delete this product?')) return;

		this.productService.delete(this.id);
		this.router.navigate(['/admin/products']);
	}

	ngOnInit() {
	}

}
