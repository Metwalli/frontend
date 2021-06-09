import { Component, OnInit, Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { ProductService } from '../../../core/services/product.service'
import { SettingsService } from '../../../core/services/settings.service'
import { OrderLine } from '../../models/order.model'
import { Language, Currency } from '../../models/settings.model'

const state = {  
  currentLanguage: JSON.parse(localStorage['currentLanguage'] || '[]'),
  localCurrency: JSON.parse(localStorage['localCurrnecy'] || '[]')
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public orderLines: OrderLine[] = []; 
  
  public currencyList: Currency[] = [];
  public languageList: Language[] = [];
  

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    public productService: ProductService,
    public settingsService: SettingsService ) {
    
      this.productService.cartItems.subscribe(response => this.orderLines = response);
      
      // this.settingsService.currentLanguage.subscribe(res => this.currentLanguage = res[0])
  }

  ngOnInit(): void {
    
    this.settingsService.getLanguageList()
      .subscribe(langs => this.languageList = langs)
    this.settingsService.getCurrencyList()
      .subscribe(curr => this.currencyList = curr)
    // if(this.settingsService.localCurrency == null)
    //   this.currencyList
    //       .subscribe(c => this.settingsService.localCurrency = c[0]);
    // this.currentLanguage = this.settingsService.getCurrencyList()
    
    this.changeLanguage(this.settingsService.getCurrentLanguage());
    this.changeCurrency(this.settingsService.getLocalCurrency());
  }

  changeLanguage(language){
    
    if (isPlatformBrowser(this.platformId)) {
      this.settingsService.setCurrentLanguage(language)
      this.translate.use(language.code)
      if(language.direction == 'rtl') {
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
    
    if (isPlatformBrowser(this.platformId) && currency != null) {      
      this.settingsService.setLocalCurrency(currency)   
      this.productService.updateCartLocalCurrency(currency)
    }      
  }

}
