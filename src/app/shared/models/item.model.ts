export class Item {
    id: string = "";
    
    name: string ="";
    description: [
        {
            lang: string,
            val: string;
        }
    ];
    type: string;
    collection: string[]=[];
    category: string[]=[];
    brand: string;
    images: any[]=[]; //Image[];
    attributes: string[]=[];
    shipping: any={}; // Shipping = new Shipping();
    specs: any[];
    price: any={}; // ProductPrice = new ProductPrice();
    sale: true;
    new: true;
    tags: string[]=[];
    variants: any[]=[]; // ProductVariant[];
    hasVariants: boolean= false;
    availableColors: string;
    lastUpdated: Date;
    sku: number;    
    barcode: number;
    trackInventory: boolean;
    productQuatity: number;
    ratings: number;
    favourite: boolean;
    productSeller: string;  
    
    discount: number=0;
}
