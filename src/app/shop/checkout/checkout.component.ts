import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe, getLocaleDateTimeFormat } from '@angular/common'
import { Observable } from 'rxjs';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { environment } from '../../../environments/environment';
import { Product } from '../../shared/models/product.model';
import { Order, OrderLine } from '../../shared/models/order.model'
import { ProductService } from "../../core/services/product.service";
import { OrderService } from "../../core/services/order.service";
import { SettingsService} from '../../core/services/settings.service'
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  public checkoutForm:  FormGroup;
  public orderDetails: Order = new Order();
  public orderLines: OrderLine[] = [];
  public shippingFees: number = 0;
  public payPalConfig ? : IPayPalConfig;
  public payment: string = 'Stripe';
  public totalAmount:  any;
  public countryList: any[] = [];
  public paymentMethod: string = "cod";

  constructor(private fb: FormBuilder,
    public productService: ProductService,
    public settingsService: SettingsService,
    public orderService: OrderService) { 
    this.checkoutForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      country: ['', Validators.required],
      town: ['', Validators.required],
      state: ['', Validators.required],
      postalcode: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.productService.cartItems.subscribe(response => this.orderLines = response);
    this.orderService.getCountryList()
      .subscribe(c => this.countryList = c)
    console.log(this.orderLines.length)
    this.initConfig();
  }

  public get getTotal(): Observable<number>{
    return this.productService.cartTotalAmount();
  }

  //set Order Details Info
  setOrderDetails(){
    const currentDate: Date = new Date()
    
    this.orderDetails.id = this.orderService.generateDocId()
    this.orderDetails.shippingRef = this.checkoutForm.value
    this.orderDetails.orderDate = currentDate.toLocaleDateString() + " " + currentDate.toLocaleTimeString()
    this.orderDetails.paymentRef = this.paymentMethod
    this.orderDetails.shippingFees = this.shippingFees
    this.productService.cartTotalAmount().subscribe(amount => this.orderDetails.amountTotal = amount)
    this.orderDetails.state = "draft"
    this.orderLines.forEach(item => item.orderId = this.orderDetails.id)

    
  }

  //Place The Order
  placeOrder(){
    debugger
    this.setOrderDetails()
    this.orderService.createOrder(this.orderDetails, this.orderLines, this.checkoutForm.value, this.orderDetails.id, this.totalAmount)
    switch( this.paymentMethod ){
      case "strip": this.stripeCheckout()
      case "payPal": this.initConfig()
      case "cod": this.codCheckout()
    }
    
  }

  // COD Order
  codCheckout(){

  }
  // Stripe Payment Gateway
  stripeCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_token, // publishble key
      locale: 'auto',
      token: (token: any) => {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        this.orderService.createOrder(this.orderDetails, this.orderLines, this.checkoutForm.value, token.id, this.totalAmount);
      }
    });
    handler.open({
      name: 'Nice Kids',
      description: 'Online Kids Store',
      amount: this.totalAmount * 100
    }) 
  }

  // Paypal Payment Gateway
  private initConfig(): void {
    this.payPalConfig = {
        currency: this.settingsService.localCurrency.currency,
        clientId: environment.paypal_token,
        createOrderOnClient: (data) => < ICreateOrderRequest > {
          intent: 'CAPTURE',
          purchase_units: [{
              amount: {
                currency_code: this.settingsService.localCurrency.currency,
                value: this.totalAmount,
                breakdown: {
                    item_total: {
                        currency_code: this.settingsService.localCurrency.currency,
                        value: this.totalAmount
                    }
                }
              }
          }]
      },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            size:  'small', // small | medium | large | responsive
            shape: 'rect', // pill | rect
        },
        onApprove: (data, actions) => {
            this.orderService.createOrder(this.orderDetails, this.orderLines, this.checkoutForm.value, data.orderID, this.getTotal);
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then(details => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });
        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
        },
        onError: err => {
            console.log('OnError', err);
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
  }

}
