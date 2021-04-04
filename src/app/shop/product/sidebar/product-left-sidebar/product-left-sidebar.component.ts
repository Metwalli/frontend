import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';

import { OrderLine } from '../../../../shared/models/order.model'
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product, ProductVariant } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { SizeModalComponent } from "../../../../shared/components/modal/size-modal/size-modal.component";

@Component({
  selector: 'app-product-left-sidebar',
  templateUrl: './product-left-sidebar.component.html',
  styleUrls: ['./product-left-sidebar.component.scss']
})
export class ProductLeftSidebarComponent implements OnInit {

  public orderLine: OrderLine = new OrderLine();
  public product: Product = new Product();
  public id: any;
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: string = "";
  public selectedColor: string = "";
  public selectedVariant: ProductVariant = new ProductVariant();
  public mobileSidebar: boolean = false;
  public ImageSrc : string
  public productVariantList : any[]=[];
  public avialableColorList: string[]=[];
  public avialableSizeList: string[]=[];
  public imagesRect: Image[]=[] ;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    public productService: ProductService) {
      
      // this.productService.getItem(this.route.snapshot.params['id']).valueChanges()
      //     .subscribe(item => this.product = item)
    }

  ngOnInit(): void {
    this.productService.getProduct(this.route.snapshot.params['id']).valueChanges()
      .subscribe(item => this.product = item)

    this.productService.getProductVariantList(this.route.snapshot.params['id'])
      .subscribe(vList =>{
        this.productVariantList = vList
        this.avialableColorList = this.getColorList()
        this.avialableSizeList = this.getSizeList()
        this.imagesRect = this.getImages()
        console.log(this.imagesRect)
      })

  }

  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }

  getColorList() {
    const colors: string[]=[];
    for(let variant of this.productVariantList) {
        if( colors.indexOf(variant.color) == -1  ){         
            colors.push(variant.color)               
      }
    }
    return colors;
  }

  isStockAvialable(color, size){
    
    for(let variant of this.productVariantList)
      if( variant.color == color && variant.size == size && variant.stock <= 0)
        return false
    return true
  }

  getVariant(color, size){
    
    for(let variant of this.productVariantList){
      if(variant.color == color && variant.size == size)
        return variant
    }
    return null
  }
  
  getSizeList() {
    const sizes: string[]=[];
    for(let variant of this.productVariantList) {     
      if( sizes.indexOf(variant.size) == -1)       
        sizes.push(variant.size)            
    }
    return sizes;
  }

  selectColor(color){
    
    if( this.selectedColor == color ){
      this.selectedColor = ""
      this.selectedVariant = null;
    }
    else{
      if( this.selectedSize != ""){
        let v = this.getVariant(color, this.selectedSize)
        if( v.stock > 0){
          this.selectedColor = color; 
          this.selectedVariant = v;
        }
      }
      else
        this.selectedColor = color
    }    
  }

  selectSize(size) {
    if( this.selectedSize == size ){
      this.selectedSize = ""
      this.selectedVariant = new ProductVariant();
       
    }
    else{    
      if( this.selectedColor != ""){
        let v = this.getVariant(this.selectedColor, size)
        if( v.stock > 0){
          this.selectedSize = size; 
          this.selectedVariant = v;
        }
      }
      else
        this.selectedSize = size
    }
  }
  
  // Increament
  increment() {
    this.counter++ ;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter-- ;
  }


  setOrderLine(){
    this.orderLine.description = this.product.name
    this.orderLine.productID = this.product.id
    this.orderLine.variantID = this.selectedVariant.id
    this.orderLine.priceLocalCurrency = this.selectedVariant.price
    this.orderLine.priceMainCurrency = this.selectedVariant.price
    this.orderLine.image = this.selectedVariant.img
    this.orderLine.qty = this.counter || 1
    this.orderLine.state = "draft"
  }
  
  // Add to cart
  async addToCart() {    
    debugger
    if(this.selectedVariant.id != ""){
      this.setOrderLine()
      const status = await this.productService.addToCart(this.orderLine);
      if(status)
        this.router.navigate(['/shop/cart']);
    }
  }

  // Buy Now
  async buyNow() {
    if(this.selectedVariant != null){      
      this.setOrderLine()
      const status = await this.productService.addToCart(this.orderLine);
      if(status)
        this.router.navigate(['/shop/checkout']);
    }
  }

  // Add to Wishlist
  addToWishlist() {
    if(this.selectedVariant != null){ 
      this.setOrderLine()
      this.productService.addToWishlist(this.orderLine);
    }
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {    
    this.mobileSidebar = !this.mobileSidebar;
  }

}
