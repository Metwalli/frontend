import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductService } from '../../../../core/services/product.service'
import { OrderLine } from '../../../models/order.model'

@Component({
  selector: 'app-cart-variation',
  templateUrl: './cart-variation.component.html',
  styleUrls: ['./cart-variation.component.scss']
})
export class CartVariationComponent implements OnInit, OnDestroy {

  @Input() direction: string = 'right'; // Default Direction Right

  public orderLines: OrderLine[] = [];

  constructor(public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.orderLines = response);
  }

  ngOnInit(): void {
    this.productService.OpenCart = false;
    console.log(this.orderLines)
  }

  closeCart() {
    this.productService.OpenCart = false;
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  ngOnDestroy(): void {
    this.closeCart();
  }

}
