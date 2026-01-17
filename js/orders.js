import * as ordersModule from '../data/orders.js';
import {loadProducts, getProduct} from '../data/products-class-oop.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {formatCurrency} from './utils/money.js';

let orderHTML = ''

new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });
}).then(() =>{
    renderOrderHTML();    
});

function renderOrderHTML(){

    ordersModule.orders.forEach((orderDetails) => {

        orderHTML += 
        `
            <div class="order-container">
                
                <div class="order-header">
                    <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${dayjs(orderDetails.orderTime).format('MMMM DD')}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${formatCurrency(orderDetails.totalCostCents)}</div>
                    </div>
                    </div>

                    <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${orderDetails.id}</div>
                    </div>
                </div>

                <div class="order-details-grid">
                    ${orderedProductDetails(orderDetails.products, orderDetails.id)}
                </div>

            </div>
        `;
    });

    document.querySelector('.js-orders-grid').innerHTML = orderHTML;

}


function orderedProductDetails(orderedProducts, orderId){

    let prodInfo;
    let orderProdDetHtml = '';

    orderedProducts.forEach((orderedItem) => {
        prodInfo = getProduct(orderedItem.productId);

        orderProdDetHtml += `
            <div class="product-image-container">
            <img src="${prodInfo.image}">
            </div>

            <div class="product-details">
            <div class="product-name">
                ${prodInfo.name}
            </div>
            <div class="product-delivery-date">
                Arriving on: ${dayjs(orderedItem.estimatedDeliveryTime).format('MMMM DD')}
            </div>
            <div class="product-quantity">
                Quantity: ${orderedItem.quantity}
            </div>
            <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
            </button>
            </div>

            <div class="product-actions">
            <a href="tracking.html?orderId=${orderId}&productId=${orderedItem.productId}">
                <button class="track-package-button button-secondary">
                Track package
                </button>
            </a>
            </div>
        `;

    });

    return orderProdDetHtml;

}
