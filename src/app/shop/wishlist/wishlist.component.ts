import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from "../../core/services/product.service";
import { SettingsService} from '../../core/services/settings.service'
import { Product, ProductVariant } from "../../shared/models/product.model";
import { OrderLine } from '../../shared/models/order.model'

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  public products: Product[] = [];

  constructor(private router: Router, 
    public productService: ProductService,
    public settingsService: SettingsService ) {
      
      this.productService.wishlistItems.subscribe(response => this.products = response);
  }

  ngOnInit(): void {
  }

  async addToCart(product: Product) {
    
    this.gotoProductDetails(product)
  }


  removeItem(product: any) {
    this.productService.removeWishlistItem(product);
  }

  gotoProductDetails(product: any){   
    this.productService.currentProduct = product;              
    let link = ['/shop/product/left/sidebar/', product.id];
    //debugger;
    this.router.navigate(link);
  }

}
