import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, Input,
  Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';

import { ProductDetailsMainSlider, ProductDetailsThumbSlider } from '../../../../shared/data/slider';
import { Product, ProductVariant } from "../../../models/product.model";
import { OrderLine } from '../../../models/order.model'
import { ProductService } from '../../../../core/services/product.service';
import { SettingsService } from '../../../../core/services/settings.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss']
})
export class QuickViewComponent implements OnInit, OnDestroy  {

  @Input() product: Product;
  @Input() currency: any;  
  @ViewChild("quickView", { static: false }) QuickView: TemplateRef<any>;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;

  public closeResult: string;
  public ImageSrc: string;
  public counter: number = 1;
  public modalOpen: boolean = false;
  public activeSlide: any = 0;
  public orderLine: OrderLine = new OrderLine();
  public selectedVariant: ProductVariant = new ProductVariant();
  public imageSrc : string;
  public productVariantList : any[]=[];
  public avialableColorImageList: any[]=[];
  public imagesRect: Image[];
  public avialableSizeList: string[]=[];
  public selectedColor: string = "";
  public selectedSize: string = "";

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, private modalService: NgbModal,
    public productService: ProductService,
    public settingsService: SettingsService ) { }

  ngOnInit(): void {
    this.productService.getProductVariantList(this.product.id)
      .subscribe(vList =>{
        this.productVariantList = vList
        this.avialableColorImageList = this.getColorImageList()
        this.avialableSizeList = this.getSizeList()
        this.imagesRect = this.getImages()      
      })
  }

  getVariant(color, size){
    
    for(let variant of this.productVariantList){
      if(variant.color == color && variant.size == size)
        return variant
    }
    return null
  }

  
  // Get Product Color and Images
  getColorImageList() {
    const colors: any[]=[];
    for(let variant of this.productVariantList) {
        if( colors.indexOf({color: variant.color, image: variant.img}) == -1  ){         
            colors.push({color:variant.color,image: variant.img})               
      }
    }
    return colors;
  }
 
  getSizeList(){
    const sizes: string[]=[];
    for(let variant of this.productVariantList) {     
      if( sizes.indexOf(variant.size) == -1)       
        sizes.push(variant.size)            
    }
    return sizes;
  }

  selectColor(color){    
    
    this.selectedColor = color['color']
    this.imageSrc = color['image']   
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
  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }

  onChangeImage(item){
    
    this.imageSrc = item['image']
    this.selectedColor = item['color']
  }

  openModal() {
    this.modalOpen = true;
    if (isPlatformBrowser(this.platformId)) { // For SSR 
      this.modalService.open(this.QuickView, { 
        size: 'lg',
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        windowClass: 'Quickview' 
      }).result.then((result) => {
        `Result ${result}`
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.ImageSrc = img.src
          }
        })
      }
    })
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

  ngOnDestroy() {
    if(this.modalOpen){
      this.modalService.dismissAll();
    }
  }

}
