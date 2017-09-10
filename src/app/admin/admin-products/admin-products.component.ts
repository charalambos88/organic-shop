import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../product.service';
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular-4-data-table';

@Component({
	selector: 'app-admin-products',
	templateUrl: './admin-products.component.html',
	styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
	products: Product[];
	subscription: Subscription;
	tableResource: DataTableResource<Product>;
	items: Product[] = [];
	itemCount: number;

	constructor(private productService: ProductService) {
		this.subscription = this.productService.getAll()
		.subscribe(products => {
			this.products = products;

			this.initiliazeTable(products);
		});
	}

	private initiliazeTable(products: Product[]) {
		this.tableResource = new DataTableResource(products);
		this.tableResource.query({ offset: 0 })
			.then(items => this.items = items);
		this.tableResource.count()
			.then(count => this.itemCount = count)
	}

	reloadItems(params) {
		if(!this.tableResource) return;

		this.tableResource.query(params)
			.then(items => this.items = items);
	}

	filter(query: string){
		let filteredProducts = (query) ?
		this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
		this.products;

		this.initiliazeTable(filteredProducts);
	}

	ngOnDestroy(){
		//epeidi mporei na exei anoixta dio tabs o xristis k theloume na fainontai
		//oi allages pou kanei apo to ena sto allo
		//kratame to subscribe active gia oso diastima exei anoixto to tab
		//kai to kanoume unsubscribe sto ondestroy.
		this.subscription.unsubscribe();
	}

	ngOnInit() {
	}

}
