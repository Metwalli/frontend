
// Order
export class Order {
    name: string;
    id: string;
    state: string;
    paymentRef: string;
    orderDate: string;
    validityDate: Date;
    isExpired: boolean;
    updatedDate: Date;
    userId: string;
    customerId: string;
    partnerInvoiceId: string;
    shippingRef: any;
    shippingFees: number;
    partnerShippedId: string;
    priceListId: string;
    currencyId: any;
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
    localCurrency: any;
    priceLocalCurrency: number;
    mainCurrency: any;
    priceMainCurrency: number;
    exchangeRate: number;
    priceTax: number;
    discount: number;
    productUomQty: number;
    state: string;

}