import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';


const state = {
  checkoutItems: JSON.parse(localStorage['checkoutItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    private router: Router,
    private afs: AngularFirestore ) {       

    }
  // Generate ID
  generateDocId(){
    return this.afs.createId()
  }

  // Get Checkout Items
  public get checkoutItems(): Observable<any> {
    const itemsStream = new Observable(observer => {
      observer.next(state.checkoutItems);
      observer.complete();
    });
    return <Observable<any>>itemsStream;
  }

  getCountryList(){
    return this.afs.collection<any>('country').valueChanges();
  }
  // Create order
  public createOrder(order: any, lines: any, details: any, orderId: any, amount: any) {
    this.afs.collection<any>("orders").doc(order.id).set(Object.assign({}, order));
    for(let line of lines){
      const id = this.afs.createId()
      this.afs.collection<any>("orderLines").doc(id).set(Object.assign({}, line))
    }

    var item = {
        shippingDetails: details,
        orderLines: lines,
        orderId: orderId,
        totalAmount: amount
    };
    state.checkoutItems = item;
    localStorage.setItem("checkoutItems", JSON.stringify(item));
    localStorage.removeItem("cartItems");
    this.router.navigate(['/shop/checkout/success', orderId]);
  }
  
}
