import {renderOrderSummary} from './checkout/orderSummary.js';
import { rendePaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {loadProducts} from '../data/products-class-oop.js';

//import '../data/backend-practice.js';


loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    rendePaymentSummary();
});
