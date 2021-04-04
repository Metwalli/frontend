import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ProductService } from '../../../core/services/product.service'
import { Product } from '../../../shared/models/product.model'


// import { ProductService } from "../../../shared/services/product.service";
// import { Product } from 'src/app/shared/classes/product';
// // import { Product } from '../../../shared/classes/product';

@Component({
  selector: 'app-collection-left-sidebar',
  templateUrl: './collection-left-sidebar.component.html',
  styleUrls: ['./collection-left-sidebar.component.scss']
})
export class CollectionLeftSidebarComponent implements OnInit {
  
  public grid: string = 'col-xl-3 col-md-6';
  public layoutView: string = 'grid-view';
  public allProducts: Product[]=[];
  public filteredProducts: Product[] = [];
  public brandFilter$ : BehaviorSubject<string|null>;
  public sizeFilter$ : BehaviorSubject<string|null>;
  public colorFilter$ : BehaviorSubject<string|null>;
  public brandFilter: any[] = [];
  public colorFilter: any[] = [];
  public sizeFilter: any[] = [];
  public minPrice: number = 0;
  public maxPrice: number = 1200;
  public tags: any[] = [];
  public category: string;
  public pageNo: number = 1;
  public paginate: any = {}; // Pagination use only
  public sortBy: string; // Sorting Order
  public mobileSidebar: boolean = false;
  public loader: boolean = true;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private viewScroller: ViewportScroller, 
    public productService: ProductService) {   
      // Get Query params..
      this.route.queryParams.subscribe(params => {

        
        this.brandFilter = params.brand ? params.brand.split(",") : [];
        this.colorFilter = params.color ? params.color.split(",") : [];
        this.sizeFilter  = params.size ? params.size.split(",")  : [];
        this.minPrice = params.minPrice ? params.minPrice : this.minPrice;
        this.maxPrice = params.maxPrice ? params.maxPrice : this.maxPrice;
        this.tags = [...this.brandFilter, ...this.colorFilter, ...this.sizeFilter]; // All Tags Array
        
        this.category = params.category ? params.category : null;
        this.sortBy = params.sortBy ? params.sortBy : 'ascending';
        this.pageNo = params.page ? params.page : this.pageNo;
        

        // Get Filtered Products..
        this.productService.filterProducts(this.tags).subscribe(response => {         
          // Sorting Filter
          this.filteredProducts = this.productService.sortProducts(response, this.sortBy);
          // Category Filter
          // if(params.category)
          //   this.products = this.products.filter(item => item.type == this.category);
          // Price Filter
          
          this.filteredProducts = this.filteredProducts.filter(item => item.price.salePrice >= this.minPrice && item.price.salePrice <= this.maxPrice) 
          // Paginate Products
          this.paginate = this.productService.getPager(this.filteredProducts.length, +this.pageNo);     // get paginate object from service
          this.filteredProducts = this.filteredProducts.slice(this.paginate.startIndex, this.paginate.endIndex + 1); // get current page of items
        })
      })
  }

  ngOnInit(): void {
    // debugger
    this.productService.getProductList()
      .subscribe(products => this.allProducts = products)
    // console.log(this.products)
  }

  // Append filter value to Url

  updateFilter(tags: any) {
    debugger
    tags.page = null; // Reset Pagination    
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: tags,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // SortBy Filter
  sortByFilter(value) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { sortBy: value ? value : null},
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Remove Tag
  removeTag(tag) {
  
    this.brandFilter = this.brandFilter.filter(val => val !== tag);
    this.colorFilter = this.colorFilter.filter(val => val !== tag);
    this.sizeFilter = this.sizeFilter.filter(val => val !== tag );

    let params = { 
      brand: this.brandFilter.length ? this.brandFilter.join(",") : null, 
      color: this.colorFilter.length ? this.colorFilter.join(",") : null, 
      size: this.sizeFilter.length ? this.sizeFilter.join(",") : null
    }

    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: params,
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Clear Tags
  removeAllTags() {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: {},
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // product Pagination
  setPage(page: number) {
    this.router.navigate([], { 
      relativeTo: this.route,
      queryParams: { page: page },
      queryParamsHandling: 'merge', // preserve the existing query params in the route
      skipLocationChange: false  // do trigger navigation
    }).finally(() => {
      this.viewScroller.setOffset([120, 120]);
      this.viewScroller.scrollToAnchor('products'); // Anchore Link
    });
  }

  // Change Grid Layout
  updateGridLayout(value: string) {
    this.grid = value;
  }

  // Change Layout View
  updateLayoutView(value: string) {
    this.layoutView = value;
    if(value == 'list-view')
      this.grid = 'col-lg-12';
    else
      this.grid = 'col-xl-3 col-md-6 col-sm-6';
  }

  // Mobile sidebar
  toggleMobileSidebar() {
    this.mobileSidebar = !this.mobileSidebar;
  }

}
