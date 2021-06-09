import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	params?: any;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			title: 'new-arrivals', type: 'sub', badge: true, badgeText: 'new', active: false, children: [									
				{ path: '/shop/collection/left/sidebar', title: 'baby-boy', type: 'link', params: { category: 'Baby Boy'}, image: "https://firebasestorage.googleapis.com/v0/b/e-commerce-83a26.appspot.com/o/media%2F1600608491707_12.jpg?alt=media&token=270c9b4e-d6a4-4d66-9163-d7ba9234cc81" },
				{ path: '/shop/collection/left/sidebar', title: 'baby-girl', type: 'link', params: { category: 'Baby Girl'} },
				{ path: '/shop/collection/left/sidebar', title: 'toddler-boy', type: 'link', params: { category: 'Toddler Boy'} },
				{ path: '/shop/collection/left/sidebar', title: 'toddler-girl', type: 'link', params: { category: 'Toddler Girl'} },											
			]
		},
		{
			title: 'kids', type: 'sub', megaMenu: true, badge: true, badgeText: 'hot', active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'toddler', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'baby', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'pages', type: 'sub', active: false, children: [
				{
					title: 'account', type: 'sub', active: false, children: [
						{ path: '/pages/wishlist', title: 'wishlist', type: 'link' },
						{ path: '/pages/cart', title: 'cart', type: 'link' },
						{ path: '/pages/dashboard', title: 'dashboard', type: 'link' },
						{ path: '/pages/login', title: 'login', type: 'link' },
						{ path: '/pages/register', title: 'register', type: 'link' },
						{ path: '/pages/contact', title: 'contact', type: 'link' },
						{ path: '/pages/forget/password', title: 'forget-password', type: 'link' },
						{ path: '/pages/profile', title: 'profile', type: 'link' },
						{ path: '/pages/checkout', title: 'checkout', type: 'link' },
					]
				},
				{ path: '/pages/aboutus', title: 'about-us', type: 'link' },
				{ path: '/pages/search', title: 'search', type: 'link' },
				{ path: '/pages/typography', title: 'typography', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/review', title: 'review', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/order/success', title: 'order-success', type: 'link' },
					{ 
						title: 'compare', type: 'sub', active: false, children: [
							{ path: '/pages/compare/one', title: 'compare-1', type: 'link' },
							{ path: '/pages/compare/two', title: 'compare-2', type: 'link', badge: true, badgeText: 'new' }
						]
					},
				{ path: '/pages/collection', title: 'collection', type: 'link' },
				{ path: '/pages/lookbook', title: 'lookbook', type: 'link' },
				{ path: '/pages/404', title: '404', type: 'link' },
				{ path: '/pages/comingsoon', title: 'coming-soon', type: 'link', badge: true, badgeText: 'new' },
				{ path: '/pages/faq', title: 'faq', type: 'link' }
			]
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'kids', type: 'sub', megaMenu: true, badge: true, badgeText: 'hot', active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'toddler', type: 'sub', megaMenu: true, active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'baby', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
				{
					title: 'boy', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'shorts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jackets', type: 'link' },
					]
				},
				{
					title: 'girl', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'dresses', type: 'link' },
						{ path: '/pages/portfolio/grid/two', title: 'sets', type: 'link' },
						{ path: '/pages/portfolio/grid/three', title: 'skirts-pants', type: 'link' },
						{ path: '/pages/portfolio/grid/four', title: 'sweaters-hodies', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/two', title: 'shirts-t-shirts', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/three', title: 'denim', type: 'link' },
						{ path: '/pages/portfolio/masonry/grid/four', title: 'jumpsuits', type: 'link' },
					]
				},
				{
					title: 'email-template', type: 'sub', active: false, children: [
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success.html', title: 'order-success', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-order-success-two.html', title: 'order-success-2', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template.html', title: 'email-template', type: 'extTabLink' },
						{ path: 'http://themes.pixelstrap.com/multikart/front-end/email-template-two.html', title: 'email-template-2', type: 'extTabLink' }
					]
				}
			]
		},
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'top',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
					  { path: '/home', title: 'ethic wear',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'shirts',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
					  { path: '/home', title: 'ethic wear',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home', title: 'dresses',  type: 'link' },
					  { path: '/home', title: 'skirts',  type: 'link' },
					  { path: '/home', title: 'westarn wear',  type: 'link' },
					  { path: '/home', title: 'ethic wear',  type: 'link' },
					  { path: '/home', title: 'bottom',  type: 'link' },
					  { path: '/home', title: 'ethic wear',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'sports wear',  type: 'link' },
					  { path: '/home', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home', title: 'shopper bags', type: 'link' },
			  { path: '/home', title: 'laptop bags', type: 'link' },
			  { path: '/home', title: 'clutches', type: 'link' },
			  {
				  path: '/home', title: 'purses', type: 'link', active: false, children: [
					  { path: '/home', title: 'purses',  type: 'link' },
					  { path: '/home', title: 'wallets',  type: 'link' },
					  { path: '/home', title: 'leathers',  type: 'link' },
					  { path: '/home', title: 'satchels',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'footwear', type: 'sub', active: false, children: [
			  { path: '/home', title: 'sport shoes', type: 'link' },
			  { path: '/home', title: 'formal shoes', type: 'link' },
			  { path: '/home', title: 'casual shoes', type: 'link' }
			]
		},
		{
			path: '/home', title: 'watches', type: 'link'
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home', title: 'fashion jewellery', type: 'link' },
			  { path: '/home', title: 'caps and hats', type: 'link' },
			  { path: '/home', title: 'precious jewellery', type: 'link' },
			  {
				  path: '/home', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home', title: 'necklaces',  type: 'link' },
					  { path: '/home', title: 'earrings',  type: 'link' },
					  { path: '/home', title: 'rings & wrist wear',  type: 'link' },
					  {
						  path: '/home', title: 'more...',  type: 'link', active: false, children: [
							  { path: '/home', title: 'ties',  type: 'link' },
							  { path: '/home', title: 'cufflinks',  type: 'link' },
							  { path: '/home', title: 'pockets squares',  type: 'link' },
							  { path: '/home', title: 'helmets',  type: 'link' },
							  { path: '/home', title: 'scarves',  type: 'link' },
							  {
								  path: '/home', title: 'more...',  type: 'link', active: false, children: [
									  { path: '/home', title: 'accessory gift sets',  type: 'link' },
									  { path: '/home', title: 'travel accessories',  type: 'link' },
									  { path: '/home', title: 'phone cases',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home', title: 'house of design', type: 'link'
		},
		{
			title: 'beauty & personal care', type: 'sub', active: false, children: [
			  { path: '/home', title: 'makeup', type: 'link' },
			  { path: '/home', title: 'skincare', type: 'link' },
			  { path: '/home', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home', title: 'fragrances',  type: 'link' },
					  { path: '/home', title: 'luxury beauty',  type: 'link' },
					  { path: '/home', title: 'hair care',  type: 'link' },
					  { path: '/home', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home', title: 'home & decor', type: 'link'
		},
		{
			path: '/home', title: 'kitchen', type: 'link'
		},
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
