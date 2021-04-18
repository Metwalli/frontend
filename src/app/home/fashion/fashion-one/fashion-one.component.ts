import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductSlider } from '../../../shared/data/slider';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model'; 

@Component({
  selector: 'app-fashion-one',
  templateUrl: './fashion-one.component.html',
  styleUrls: ['./fashion-one.component.scss']
})
export class FashionOneComponent implements OnInit {
  productList: Product[] = [];
  public productCollections: any[] = [];
  
  constructor(public productService: ProductService) {    
    productService.getProductList().subscribe(response => {
      this.productList = response;
      // Get Product Collection
      this.productList.filter((item) => {
        item.collection.filter((collection) => {
          const index = this.productCollections.indexOf(collection);
          if (index === -1) this.productCollections.push(collection);
        })
      })
    });
  }

  public ProductSliderConfig: any = ProductSlider;

  public sliders = [{
    title: 'welcome to fashion',
    subTitle: 'kids fashion',
    image: 'assets/images/slider/1.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'toddler fashion',
    image: 'assets/images/slider/2.jpg'
  }, {
    title: 'welcome to fashion',
    subTitle: 'baby fashion',
    image: 'assets/images/slider/2.jpg'
  }]

  // Collection banner
  public collections = [{
    image: 'assets/images/collection/fashion/1.jpg',
    save: 'save 50%',
    title: 'kids-boy',
    params: "Kids Boy"
  }, {
    image: 'assets/images/collection/fashion/2.jpg',
    save: 'save 50%',
    title: 'kids-girl',
    params: "Kids Girl"
  },{
    image: 'assets/images/collection/fashion/1-3.jpg',
    save: 'save 50%',
    title: 'toddler-boy',
    params: "Toddler Boy"
  },{
    image: 'assets/images/collection/fashion/1-2.jpg',
    save: 'save 50%',
    title: 'toddler-girl',
    params: "Toddler Girl"
  }];

  // Blog
  public blog = [{
    image: 'assets/images/blog/1.jpg',
    date: '25 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/2.jpg',
    date: '26 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/3.jpg',
    date: '27 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }, {
    image: 'assets/images/blog/4.jpg',
    date: '28 January 2018',
    title: 'Lorem ipsum dolor sit consectetur adipiscing elit,',
    by: 'John Dio'
  }];

  // Logo
  public logo = [{
    image: 'assets/images/logos/1.png',
  }, {
    image: 'assets/images/logos/2.png',
  }, {
    image: 'assets/images/logos/3.png',
  }, {
    image: 'assets/images/logos/4.png',
  }, {
    image: 'assets/images/logos/5.png',
  }, {
    image: 'assets/images/logos/6.png',
  }, {
    image: 'assets/images/logos/7.png',
  }, {
    image: 'assets/images/logos/8.png',
  }];

  ngOnInit(): void {
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.productList.filter((item) => {
      if (item.collection.find(i => i === collection)) {
        return item
      }
    })
  }
  
}
