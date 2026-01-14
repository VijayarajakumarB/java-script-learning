import * as cartJs from '../data/cart.js';
import {products} from '../data/products.js';
import * as moneyModule from './utils/money.js';

let prodHtml = '';

products.forEach(data => {

    prodHtml += `
    <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${data.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${data.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${data.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${data.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${moneyModule.formatCurrency(data.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${data.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${data.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart-button"
          data-prod-id = ${data.id}>
            Add to Cart
          </button>
        </div>
    `;

});

document.querySelector('.js-prod-grid').innerHTML = prodHtml;

const addCartButtons = document.querySelectorAll('.js-add-cart-button');


function updateCartQuantity(){

   document.querySelector('.js-cart-quantity').innerHTML = cartJs.calculateCartQuantity();;

}

updateCartQuantity();

addCartButtons.forEach(button => {

    button.addEventListener('click', () => {
        let product_id = button.dataset.prodId;
        let timeOutSet = '';

        cartJs.addToCart(product_id);
        updateCartQuantity()
        

    const addedMsg = document.querySelector(`.js-added-to-cart-${product_id}`);
    addedMsg.classList.add('disp-added-to-cart-msg');
    if(timeOutSet){
        clearTimeout(timeOutSet);
    }
    const timeOut = setTimeout(() => {
        addedMsg.classList.remove('disp-added-to-cart-msg');
    }, 2000);
    
    timeOutSet = timeOut;

    });

});