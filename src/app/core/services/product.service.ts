import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
// import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { finalize, tap, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { map, startWith, delay } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { Order, OrderLine } from '../../shared/models/order.model'
import { Product, ProductVariant } from '../../shared/models/product.model'

const state = {
  products: JSON.parse(localStorage['products'] || '[]'),
  wishlist: JSON.parse(localStorage['wishlistItems'] || '[]'),
  compare: JSON.parse(localStorage['compareItems'] || '[]'),
  cart: JSON.parse(localStorage['cartItems'] || '[]')
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public Currency: any = null; // = { name: 'Dollar', currency: 'USD', price: 1 } // Default Currency
  public OpenCart: boolean = false;

  private catCollection: AngularFirestoreCollection<any>;
  public productsCollection: AngularFirestoreCollection<any>;
  public currencyExchangeList: AngularFirestoreCollection<any>;
  public currentProduct: Product;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: string;
  // private attributeList: AngularFireList<any>;
  categoryList: Observable<any[]>;
  products: Observable<any[]>;
  productList: any[] = [];
  constructor(
    private afs: AngularFirestore, 
    private storage: AngularFireStorage,
    private toastrService: ToastrService
    ) {
      this.catCollection = afs.collection<any>('category');
      this.productsCollection = afs.collection<any>('products');
      this.currencyExchangeList = afs.collection<any>('currencyExchange');
      
      this.afs
        .collection("products")
        .get()
        .subscribe((ss) => {
          ss.docs.forEach((doc) => {
            this.productList.push(doc.data());
          });
        });
  } 
    
  getCategoryList() {
    return this.afs.collection('category').valueChanges();
  }
   
  getVariant(id: string){
    return this.afs.collection('variants', ref => ref.where('id', '==', id)).valueChanges();
    // return this.afs.collection<any>('variants')
    //   .valueChanges().pipe(map(variants => { 
    //   return variants.find((v: any) => { 
    //     return v.id == id; 
    //   }); 
    // }));
  }
  
  getVariantList(){
    return this.afs.collection<any>('variants').valueChanges();
  }

  getProductVariantList(productId: string | null){
    return this.afs.collection('variants', ref => ref.where('productId', '==', productId)).valueChanges();
  }
  
  getTags(){
    return this.afs.collection('tags').valueChanges();
  }

   /*
    ---------------------------------------------
    ---------------  Product  -------------------
    ---------------------------------------------
  */

  getProductList(): Observable<Product[]>{
    return this.productsCollection.valueChanges();
  }
  getProduct(id: string): AngularFirestoreDocument<Product>{
    return this.afs.doc<Product>("products/" + id);
  }

  // Get Products
  public get getProducts(): Observable<Product[]> {
    return this.productsCollection.valueChanges();
  }

  // Get Products By Slug
  public getProductById(id: string): Observable<Product> {    
    return this.getProductList().pipe(map(items => { 
      return items.find((item: any) => { 
        return item.id == id; 
      }); 
    }));
  }


  /*
    ---------------------------------------------
    ---------------  Wish List  -----------------
    ---------------------------------------------
  */

  // Get Wishlist Items
  public get wishlistItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.wishlist);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Wishlist
  public addToWishlist(product): any {
    const wishlistItem = state.wishlist.find(item => item.id === product.id)
    if (!wishlistItem) {
      state.wishlist.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in wishlist.');
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  // Remove Wishlist items
  public removeWishlistItem(product: Product): any {
    const index = state.wishlist.indexOf(product);
    state.wishlist.splice(index, 1);
    localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    return true
  }

  /*
    ---------------------------------------------
    -------------  Compare Product  -------------
    ---------------------------------------------
  */

  // Get Compare Items
  public get compareItems(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.compare);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // Add to Compare
  public addToCompare(product): any {
    const compareItem = state.compare.find(item => item.id === product.id)
    if (!compareItem) {
      state.compare.push({
        ...product
      })
    }
    this.toastrService.success('Product has been added in compare.');
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  // Remove Compare items
  public removeCompareItem(product: Product): any {
    const index = state.compare.indexOf(product);
    state.compare.splice(index, 1);
    localStorage.setItem("compareItems", JSON.stringify(state.compare));
    return true
  }

  /*
    ---------------------------------------------
    -----------------  Cart  --------------------
    ---------------------------------------------
  */

  // Get Cart Items
  public get cartItems(): Observable<OrderLine[]> {
    const itemsStream = new Observable(observer => {
      observer.next(state.cart);
      observer.complete();
    });
    return <Observable<OrderLine[]>>itemsStream;
  }

  // Add to Cart
  public addToCart(orderLine: OrderLine): any {    
    const cartItem = state.cart.find(item => item.variantId === orderLine.variantId);
    const qty = orderLine.qty ? orderLine.qty : 1;
    

    if (cartItem) {
        cartItem.qty += qty    
    } else {
      state.cart.push({
        ...orderLine,
        qty: qty
      })
    }

    this.OpenCart = true; // If we use cart variation modal
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true;
  }

  // Update Cart Quantity
  public updateCartQuantity(orderLine: OrderLine, quantity: number): OrderLine | boolean {
    return state.cart.find((items, index) => {
      if (items.id === orderLine.variantId) {
        const qty = state.cart[index].qty + quantity
        if (qty !== 0 ) {
          state.cart[index].qty = qty
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cart));
        return true
      }
    })
  }

  // Remove Cart items
  public removeCartItem(orderLine: OrderLine): any {
    const index = state.cart.indexOf(orderLine);
    state.cart.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(state.cart));
    return true
  }

  // Total amount 
  public cartTotalAmount(): Observable<number> {
    return this.cartItems.pipe(map((orderLine: OrderLine[]) => {
      return orderLine.reduce((prev, curr: OrderLine) => {
        let price = curr.priceLocalCurrency;
        // if(curr.discount) {
        //   price = curr.priceLocalCurrency - (curr.priceLocalCurrency * curr.discount / 100)
        // }
        return (prev + price * curr.qty) * this.Currency.price;
      }, 0);
    }));
  }

  /*
    ---------------------------------------------
    ------------  Filter Product  ---------------
    ---------------------------------------------
  */

  // Get Product Filter
  public filterProducts(filter: any): Observable<Product[]> {  
    return this.getProductList().pipe(map(products => 
      products.filter((item: Product) => {
        if (!filter.length) return true
        const Tags = filter.some((prev) => { // Match Tags          
        if (item.tags) {
          if (item.tags.includes(prev)) {
            return prev
          }
        }
        })
        return Tags
      })
    ));
  }

  // Sorting Filter
  public sortProducts(products: Product[], payload: string): any {

    if(payload === 'ascending') {
      return products.sort((a, b) => {
        if (a.id < b.id) {
          return -1;
        } else if (a.id > b.id) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'a-z') {
      return products.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'z-a') {
      return products.sort((a, b) => {
        if (a.name > b.name) {
          return -1;
        } else if (a.name < b.name) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'low') {
      return products.sort((a, b) => {
        if (a.price < b.price) {
          return -1;
        } else if (a.price > b.price) {
          return 1;
        }
        return 0;
      })
    } else if (payload === 'high') {
      return products.sort((a, b) => {
        if (a.price > b.price) {
          return -1;
        } else if (a.price < b.price) {
          return 1;
        }
        return 0;
      })
    } 
  }

  /*
    ---------------------------------------------
    ------------- Product Pagination  -----------
    ---------------------------------------------
  */
  public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 16) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    // Paginate Range
    let paginateRange = 3;

    // ensure current page isn't out of range
    if (currentPage < 1) { 
      currentPage = 1; 
    } else if (currentPage > totalPages) { 
      currentPage = totalPages; 
    }
    
    let startPage: number, endPage: number;
    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else if(currentPage < paginateRange - 1){
      startPage = 1;
      endPage = startPage + paginateRange - 1;
    } else {
      startPage = currentPage - 1;
      endPage =  currentPage + 1;
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}
