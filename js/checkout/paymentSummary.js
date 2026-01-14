import * as cartModule from '../../data/cart.js';
import * as productModule from '../../data/products.js';
import * as optionsDel from '../../data/deliveryOptions.js';
import * as moneyModule from '../utils/money.js';


export function rendePaymentSummary(){

    let productPriceCents = 0;
    let productShippingCents = 0;
    let totalQuantity = 0;

    cartModule.amazonCart.forEach(cartItem => {

        const cartProdId = cartItem.product_id;
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

    console.log(productPriceCents);
    console.log(productShippingCents);
    console.log(totalBeforeTaxCents);
    console.log(taxCents);
    console.log(totalCents);


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

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;


    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

}