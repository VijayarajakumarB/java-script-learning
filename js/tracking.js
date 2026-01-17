import * as ordersModule from '../data/orders.js';
import {loadProducts, getProduct} from '../data/products-class-oop.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const urlLinkPar = new URL(window.location.href);
let productId = urlLinkPar.searchParams.get('productId');
let orderedId = urlLinkPar.searchParams.get('orderId');

loadProducts(renderTrackingHTML);

function renderTrackingHTML(){

    let trackingHTML = '';

    let orderedProductItem = ordersModule.getMatchingProductInfo(orderedId, productId);
    let productItem = getProduct(productId);

    trackingHTML += `
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on Monday, ${dayjs(orderedProductItem.estimatedDeliveryTime).format('MMMM DD')}
        </div>

        <div class="product-info">
          ${productItem.name}
        </div>

        <div class="product-info">
          Quantity: ${orderedProductItem.quantity}
        </div>

        <img class="product-image" src="${productItem.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
    `;

    document.querySelector('.js-order-tracking').innerHTML = trackingHTML;

}