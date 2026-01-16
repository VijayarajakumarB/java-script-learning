import {renderOrderSummary} from './checkout/orderSummary.js';
import { rendePaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {loadProducts} from '../data/products-class-oop.js';

//import '../data/backend-practice.js';


new Promise((resolve) => {
    loadProducts(() => {
         resolve();
    });
}).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    rendePaymentSummary();
});


/*loadProducts(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    rendePaymentSummary();
});*/
