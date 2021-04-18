import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Image } from '@ks89/angular-modal-gallery';

import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";

import { Product } from '../../../models/product.model'
import { OrderLine } from '../../../models/order.model'
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-box-one',
  templateUrl: './product-box-one.component.html',
  styleUrls: ['./product-box-one.component.scss']
})
export class ProductBoxOneComponent implements OnInit {

  @Input() product: Product;
  @Input() currency: any = this.productService.Currency; // Default Currency 
  @Input() thumbnail: boolean = false; // Default False 
  @Input() onHoverChangeImage: boolean = false; // Default False
  @Input() cartModal: boolean = false; // Default False
  @Input() loader: boolean = false;
  
  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;

  public orderLine: OrderLine = new OrderLine();
  public imageSrc : string
  public productVariantList : any[]=[];
  public avialableColorList: string[]=[];
  public imagesRect: Image[] ;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
  }

  ngOnInit(): void {
    this.productService.getProductVariantList(this.product.id)
      .subscribe(vList =>{
        this.productVariantList = vList
        this.avialableColorList = this.getColorList()
        this.imagesRect = this.getImages()
      })
    if(this.loader) {
      setTimeout(() => { this.loader = false; }, 2000); // Skeleton Loader
    }
  }

  // Change Variants
  ChangeVariants(color, product) {
    product.variants.map((item) => {
      if (item.color === color) {
        product.images.map((img) => {
          if (img.image_id === item.image_id) {
            this.imageSrc = img.src;
          }
        })
      }
    })
  }
 
  
  // Change Variants Image
  ChangeVariantsImage(src) {
    this.imageSrc = src;
  }

  addToCart(product: Product) {
    this.orderLine.description = product.name
    this.orderLine.productId = product.id
    // this.orderLine.variantID = this.getVariantID()
    // this.productService.addToCart(product);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

  getImages(){
    const imgs: Image[] = [];
    for(let i = 0; i< this.productVariantList.length; i++){
      imgs.push(new Image(i, { img: this.productVariantList[i]['img'] }, { img: this.productVariantList[i]['img'] }))
    }
    return imgs  
  }

  // Get Product Color and Images
  getColorList() {
    const colors: any[]=[];
    for(let variant of this.productVariantList) {
        if( colors.indexOf({color: variant.color, image: variant.img}) == -1  ){         
            colors.push({color:variant.color,image: variant.img})               
      }
    }
    return colors;
  }

  gotoProductDetails(product: any){   
    this.productService.currentProduct = product;              
    let link = ['/shop/product/left/sidebar/', product.id];
    //debugger;
    this.router.navigate(link);
  }


}
