import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Language, Currency } from 'src/app/shared/models/settings.model';


const state = {
  language: JSON.parse(localStorage['currentLanguage'] || '[]'),
  currency: JSON.parse(localStorage['localCurrency'] || '[]')
}


@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  public currencyExchangeList: AngularFirestoreCollection<any>;
  public localCurrency: Currency = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency
  // public currentLanguage: Language;
  constructor(private afs: AngularFirestore) { 

    
    this.currencyExchangeList = afs.collection<any>('currencyExchange');
    // debugger
    // this.currencyExchangeList.valueChanges()
    //   .subscribe(currency => {
    //     currency.find((c: any) =>{
    //       if (c.currency == this.localCurrency.currency)
    //         this.localCurrency = c
    //     }) 
    //   })
  }

  getLanguageList(){
    return this.afs.collection<any>('language').valueChanges();      
  }

  getCurrencyList(){
    return this.afs.collection<any>('currencyExchange').valueChanges();      
  }

  setCurrentLanguage(language){
    state.language = language
    localStorage.setItem("currentLanguage", JSON.stringify(state.language));
  }
  
  public get currentLanguage(): Observable<Language> {
    const itemsStream = new Observable(observer => {
      observer.next(state.language);
      observer.complete();
    });
    return <Observable<Language>>itemsStream;
  }

  getCurrentLanguage(){
    return state.language
  }

  setLocalCurrency(currency){  
    this.localCurrency = currency  
    state.currency = currency
    localStorage.setItem("localCurrency", JSON.stringify(state.currency))
  }
  getLocalCurrency(){
    return state.currency
  }
}
