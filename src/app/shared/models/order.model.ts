
// Order
export interface Order {
    name: string;
    orderNo: string;
    state: string;
    paymentRef: string;
    orderDate: Date;
    validityDate: Date;
    isExpired: boolean;
    updatedDate: Date;
    useID: string;
    customerID: string;
    partnerInvoiceID: string;
    shippingRef: any;
    partnerShippedID: string;
    priceListID: string;
    currencyID: string;
    invoiceStatus: string;
    amountTax: number;
    amountTotal: number;
    currancyRate: number;    
}

export class OrderLine{
    orderID: string;
    productID: string;
    variantID: string;
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