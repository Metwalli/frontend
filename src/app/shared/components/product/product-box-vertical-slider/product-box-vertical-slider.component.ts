import { Component, OnInit, Input } from '@angular/core';
import { NewProductSlider } from '../../../data/slider';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { SettingsService } from '../../../../core/services/settings.service';

@Component({
  selector: 'app-product-box-vertical-slider',
  templateUrl: './product-box-vertical-slider.component.html',
  styleUrls: ['./product-box-vertical-slider.component.scss']
})
export class ProductBoxVerticalSliderComponent implements OnInit {

  @Input() title: string = 'New Product'; // Default
  @Input() type: string = 'fashion'; // Default Fashion

  public products : Product[] = [];

  public NewProductSliderConfig: any = NewProductSlider;

  constructor(
    public productService: ProductService, 
    public settingsService: SettingsService) { 
    this.productService.getProducts.subscribe(response => 
      this.products = response.filter(item => item.type == this.type)
    );
  }

  ngOnInit(): void {
  }

}
