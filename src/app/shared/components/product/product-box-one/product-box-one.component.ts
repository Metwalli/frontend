import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';

import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";

import { Product, ProductVariant } from '../../../models/product.model'
import { OrderLine } from '../../../models/order.model'
import { ProductService } from '../../../../core/services/product.service';
import { SettingsService} from '../../../../core/services/settings.service'

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product: Product;
  @Input() currency: any = this.settingsService.localCurrency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHoverChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public orderLine: OrderLine = new OrderLine();
  public selectedVariant: ProductVariant = new ProductVariant();
  public imageSrc : string;
  public productVariantList : any[]=[];
  public avialableColorImageList: any[]=[];
  public imagesRect: Image[];
  public avialableSizeList: string[]=[];
  public selectedColor: string = "";

  constructor(
    private productService: ProductService,
    private settingsService: SettingsService,
    private router: Router
    ) { 
  }

  ngOnInit(): void {
    this.productService.getProductVariantList(this.product.id)
      .subscribe(vList =>{
        this.productVariantList = vList
        this.avialableColorImageList = this.getColorImageList()
        this.avialableSizeList = this.getSizeList()
        this.imagesRect = this.getImages()
        this.selectedVariant = this.getVariant(this.imageSrc, this.avialableSizeList[0])
        this.selectColor(this.avialableColorImageList[0])
      })
    if(this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
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

  // Change Variants Image
  changeVariantsImage(item) {
    this.imageSrc = item['image'];
    this.selectedColor = item['color']
  }

  setOrderLine(){
    
    this.orderLine.description = this.product.name + " Size:" + this.selectedVariant.size + " Color:" + this.selectedVariant.color
    this.orderLine.productId = this.product.id
    this.orderLine.variantId = this.selectedVariant.id
    this.orderLine.localCurrency = this.settingsService.localCurrency
    this.orderLine.priceLocalCurrency = this.selectedVariant.price * this.settingsService.localCurrency.price
    this.orderLine.priceMainCurrency = this.selectedVariant.price
    this.orderLine.image = this.selectedVariant.img
    this.orderLine.qty = 1
    this.orderLine.state = "draft"
  }

  async addToCart(product: Product) {
    
    //TODO: should show available size to choose the size
    this.selectedVariant = this.getVariant(this.selectedColor, this.avialableSizeList[0])
    if(this.selectedVariant.id != ""){
      this.setOrderLine()
      const status = this.productService.addToCart(this.orderLine);
    }
  }

  addToWishlist(product: Product) {
    
    this.productService.addToWishlist(product);
    
  }

  addToCompare(product: Product) {
    debugger
    this.productService.addToCompare(product);
  }

  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }

  

  gotoProductDetails(product: any){   
    this.productService.currentProduct = product;              
    let link = ['/shop/product/left/sidebar/', product.id];
    //debugger;
    this.router.navigate(link);
  }


}
