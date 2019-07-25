import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../../services/page-title.service';
import { Product } from '../../models/products.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productsLink: string;
  products: Product[];

  constructor( private pageTitle: PageTitleService,
               private productsService: ProductsService) { }

  ngOnInit() {
    this.pageTitle.setTitle('Coffee Products - Products');
    this.getAllProducts();
  }

  getAllProducts() {
    this.productsService.getProducts().subscribe(
      products => {
        this.products = products;
      }
    );
  }

  activeProduct(product: string) {
    this.productsLink = product;
  }

}
