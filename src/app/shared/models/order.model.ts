
// Order
export class Order {
    name: string;
    orderId: string;
    state: string;
    paymentRef: string;
    orderDate: Date;
    validityDate: Date;
    isExpired: boolean;
    updatedDate: Date;
    useId: string;
    customerId: string;
    partnerInvoiceId: string;
    shippingRef: any;
    partnerShippedId: string;
    priceListId: string;
    currencyId: string;
    invoiceStatus: string;
    amountTax: number;
    amountTotal: number;
    currancyRate: number;    
}

export class OrderLine{
    orderId: string;
    productId: string;
    variantId: string;
    description: string;
    image: string;
    qty: number;
    localCurrency: string;
    priceLocalCurrency: number;
    mainCurrency: string;
    priceMainCurrency: number;
    priceTax: number;
    discount: number;
    productUomQty: number;
    state: string;

}