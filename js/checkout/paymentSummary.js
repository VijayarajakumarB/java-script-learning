import {cart} from '../../data/cart-class-oop.js';
import * as productModule from '../../data/products-class-oop.js';
import * as optionsDel from '../../data/deliveryOptions.js';
import * as moneyModule from '../utils/money.js';
import { addOrders } from '../../data/orders.js';


export function rendePaymentSummary(){

    let productPriceCents = 0;
    let productShippingCents = 0;
    let totalQuantity = 0;

    cart.amazonCart.forEach(cartItem => {

        const cartProdId = cartItem.productId;
        const cartProdQuantity = cartItem.quantity;
        const cartDeliveryOptionId = cartItem.deliveryOptionId;

        totalQuantity += cartProdQuantity;

        let matchingProduct = productModule.getProduct(cartProdId);
        productPriceCents += matchingProduct.priceCents * cartProdQuantity;

        let deliveryOption = optionsDel.getDeliveryOptions(cartDeliveryOptionId);
        productShippingCents += deliveryOption.priceCents;



    });

    const totalBeforeTaxCents = productPriceCents + productShippingCents;

    const taxCents = totalBeforeTaxCents * 0.1;

    const totalCents = totalBeforeTaxCents + taxCents;

    let paymentSummaryHtml = `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalQuantity}):</div>
            <div class="payment-summary-money">$${moneyModule.formatCurrency(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${moneyModule.formatCurrency(productShippingCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${moneyModule.formatCurrency(totalBeforeTaxCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${moneyModule.formatCurrency(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${moneyModule.formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order-button">
            Place your order
          </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;


    const orderButton = document.querySelector('.js-place-order-button');

    orderButton.addEventListener('click', async ()=> {
        try{
            const response = await fetch('https://supersimplebackend.dev/orders', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                cart : cart.amazonCart
              })
            });

          const order = await response.json();
          addOrders(order);

        }catch(error){
            console.error('unexpected error happened');
        }
        
        window.location.href='orders.html';
    });

}