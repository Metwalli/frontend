import { Component, OnInit } from '@angular/core';
import { Product } from '../../../shared/models/product.model';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-tabs',
  templateUrl: './product-tabs.component.html',
  styleUrls: ['./product-tabs.component.scss']
})
export class ProductTabsComponent implements OnInit {

  public products: Product[] = [];

  constructor(public productService: ProductService) { 
    this.productService.getProducts.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

}
