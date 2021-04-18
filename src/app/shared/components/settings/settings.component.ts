import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ProductService } from '../../../core/services/product.service'
import { OrderLine } from '../../models/order.model'



@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public orderLines: OrderLine[] = [];

  
  public languages = [{
    name: 'العربية',
    code: 'ar'
  }, { 
    name: 'English',
    code: 'en'
  }, {
    name: 'French',
    code: 'fr'
  }];

  public currencies: Observable<any[]>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService) {
    this.productService.cartItems.subscribe(response => this.orderLines = response);
    this.currencies = this.productService.currencyExchangeList.valueChanges();
  }

  ngOnInit(): void {
    if(this.productService.Currency == null)
      this.currencies
          .subscribe(c => this.productService.Currency = c[0]);
  }

  changeLanguage(code){
    if (isPlatformBrowser(this.platformId)) {
      this.translate.use(code)
      if(code == 'ar') {
        document.body.classList.remove('ltr')
        document.body.classList.add('rtl')
      } else {
        document.body.classList.remove('rtl')
        document.body.classList.add('ltr')
      }
    }
  }

  get getTotal(): Observable<number> {
    return this.productService.cartTotalAmount();
  }

  removeItem(product: any) {
    this.productService.removeCartItem(product);
  }

  changeCurrency(currency: any) {
    this.productService.Currency = currency
  }

}
