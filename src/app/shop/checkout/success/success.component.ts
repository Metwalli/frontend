import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Order } from '../../../shared/models/order.model';
import { OrderService } from '../../../core/services/order.service';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit, AfterViewInit{

  public orderDetails : Order = new Order();

  constructor(public productService: ProductService,
    private orderService: OrderService) { }

  ngOnInit(): void {	
    this.orderService.checkoutItems.subscribe(response => this.orderDetails = response);
  }

  ngAfterViewInit() {
    
  }

}
