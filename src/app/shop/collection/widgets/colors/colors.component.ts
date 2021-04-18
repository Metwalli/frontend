import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductService } from '../../../../core/services/product.service'
import { Product, ProductVariant } from '../../../../shared/models/product.model'
@Component({
  selector: 'app-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss']
})
export class ColorsComponent implements OnInit {

  public uniqueColors = []

  @Input() products: Product[] = [];

  @Input() colors: any[] = [];

  @Output() colorsFilter  : EventEmitter<any> = new EventEmitter<any>();
  
  public collapse: boolean = true;

  constructor( private productService: ProductService ) { 
  }

  ngOnInit(): void {
    this.productService.getVariantList()
      .subscribe((vList: any) => {
        for(let variant of vList){
          if (variant.color) {
            const index = this.uniqueColors.indexOf(variant.color.toLocaleUpperCase())
            if (index === -1) this.uniqueColors.push(variant.color.toLocaleUpperCase())
          }
        }
        
      })
  }

  appliedFilter(event) {
    let index = this.colors.indexOf(event.target.value);  // checked and unchecked value
    if (event.target.checked)   
        this.colors.push(event.target.value); // push in array cheked value
    else 
        this.colors.splice(index,1);  // removed in array unchecked value
    
    let colors = this.colors.length ? { color: this.colors.join(",") } : { color: null };    
    this.colorsFilter.emit(colors);
  }

  // check if the item are selected
  checked(item){
    if(this.colors.indexOf(item) != -1){
      return true;
    }
  }

}
