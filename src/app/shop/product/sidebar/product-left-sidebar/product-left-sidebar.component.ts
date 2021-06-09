import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';
import { Observable } from 'rxjs';


import { OrderLine } from '../../../../shared/models/order.model'
import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product, ProductVariant } from '../../../../shared/models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { SettingsService} from '../../../../core/services/settings.service';
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
  public imageSrc : string
  public productVariantList : any[]=[];
  public avialableColorImageList: any[]=[];
  public avialableSizeList: string[]=[];
  public imagesRect: Image[]=[] ;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;
  
  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private productService: ProductService,
    public settingsService: SettingsService) {
      
    }

  ngOnInit(): void {
    this.productService.getProduct(this.route.snapshot.params['id']).valueChanges()
      .subscribe(item => this.product = item)

    this.productService.getProductVariantList(this.route.snapshot.params['id'])
      .subscribe(vList =>{
        this.productVariantList = vList
        this.avialableColorImageList = this.getColorImageList()
        this.avialableSizeList = this.getSizeList()
        this.imagesRect = this.getImages()
      })

  }
  getCurrency(){
    return this.settingsService.localCurrency
  }
  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }

  getColorImageList() {
    const colors: any[]=[];
    for(let variant of this.productVariantList) {
        if( colors.indexOf({color: variant.color, image: variant.img}) == -1  ){         
            colors.push({color:variant.color,image: variant.img})               
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

  onChangeImage(item){
    
    this.imageSrc = item['image']
    this.selectedColor = item['color']
  }

  selectColor(item){    
    if( this.selectedColor == item['color'] ){
      this.selectedColor = ""
      this.selectedVariant = new ProductVariant();
    }
    else{
      if( this.selectedSize != ""){
        let v = this.getVariant(item['color'], this.selectedSize)
        if(v)
          if( v.stock > 0){
            this.selectedColor = item['color']; 
            this.imageSrc = item['image']
            this.selectedVariant = v;
          }          
      }
      else
        this.selectedColor = item['color']
        this.imageSrc = item['image']
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
        if(v)       
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
    
    this.orderLine.description = this.product.name + " Size:" + this.selectedVariant.size + " Color:" + this.selectedVariant.color
    this.orderLine.productId = this.product.id
    this.orderLine.variantId = this.selectedVariant.id
    this.orderLine.localCurrency = this.settingsService.localCurrency
    this.orderLine.priceLocalCurrency = this.selectedVariant.price * this.settingsService.localCurrency.price
    this.orderLine.priceMainCurrency = this.selectedVariant.price
    this.orderLine.image = this.selectedVariant.img
    this.orderLine.qty = this.counter || 1
    this.orderLine.state = "draft"
  }
  
  // Add to cart
  async addToCart() {   
     
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
    this.productService.addToWishlist(this.product);
  }

  // Toggle Mobile Sidebar
  toggleMobileSidebar() {    
    this.mobileSidebar = !this.mobileSidebar;
  }

}
