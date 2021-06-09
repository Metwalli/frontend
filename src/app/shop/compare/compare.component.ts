import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../core/services/product.service";
import { SettingsService} from '../../core/services/settings.service'
import { Product } from "../../shared/models/product.model";

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  public products: Product[] = [];

  constructor(private router: Router, 
    public productService: ProductService,
    public settingsService: SettingsService) {
    this.productService.compareItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  async addToCart(product: any) {
    this.gotoProductDetails(product)
  }

  removeItem(product: any) {
    this.productService.removeCompareItem(product);
  }

  gotoProductDetails(product: any){   
    this.productService.currentProduct = product;              
    let link = ['/shop/product/left/sidebar/', product.id];
    //debugger;
    this.router.navigate(link);
  }

}
