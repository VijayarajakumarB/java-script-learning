import * as cartModule from '../../data/cart.js';
import * as productModule from '../../data/products.js';
import * as moneyModule from '../utils/money.js';
import * as optionsDel from '../../data/deliveryOptions.js';
import { rendePaymentSummary } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function renderOrderSummary(){

    let cartSummaryHtml = '';

    cartModule.amazonCart.forEach(cartItem =>{

      let productId = cartItem.product_id;
      let deliveryOptionsId = cartItem.deliveryOptionId;

      let matchingProduct = productModule.getProduct(productId);

      let deliveryOption = optionsDel.getDeliveryOptions(deliveryOptionsId);

      cartSummaryHtml +=`
          <div class="cart-item-container js-cart-item-container-test js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${optionsDel.calculateDeliveryDate(deliveryOption.deiveryDate)}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${moneyModule.formatCurrency(matchingProduct.priceCents)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-quantity-link"
                    data-prod-id="${matchingProduct.id}">
                      Update
                    </span>
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}"/>
                    <span class="save-quantity-link link-primary js-save-quantity-link"
                    data-prod-id="${matchingProduct.id}">Save</span>
                    <span class="delete-quantity-link link-primary js-delete-quantity-link"
                    data-prod-id="${matchingProduct.id}">
                      Delete
                    </span>
                  </div>
              </div>

              <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  
                  ${deliveryOptiionsHTML(matchingProduct, cartItem)}  
                  
                  
                </div>
              </div>
          </div>
      `;

  });


  function deliveryOptiionsHTML(matchingProduct, cartItem){
    
    let deliveryOptHtml = '';

    optionsDel.deliveryOptiions.forEach(opt => {

      let isChecked = cartItem.deliveryOptionId === opt.id;

      const shipPrice = opt.priceCents === 0 ? 'FREE - ' : `$${moneyModule.formatCurrency(opt.priceCents)} - `;

      deliveryOptHtml += `
      <div class="delivery-option js-delivery-option-input"
      data-opt-id = "${opt.id}"
      data-prod-id = "${matchingProduct.id}"
      >
        <input type="radio" 
              ${isChecked ? 'checked' : ''}
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${optionsDel.calculateDeliveryDate(opt.deiveryDate)}
          </div>
          <div class="delivery-option-price">
            ${shipPrice}Shipping
          </div>
        </div>
      </div> 
      `;
    });

    return deliveryOptHtml;

  }

  document.querySelector('.js-order-cart-summary').innerHTML = cartSummaryHtml;

  const deleteLinks = document.querySelectorAll('.js-delete-quantity-link');

  deleteLinks.forEach(link => {
      link.addEventListener('click', () => {
          let productId = link.dataset.prodId;
          cartModule.removeFromCart(productId);
          renderOrderSummary();
        //   document.querySelector(`.js-cart-item-container-${productId}`).remove();
          rendePaymentSummary();
          renderCheckoutHeader();
      });
  });


  const updateLinks = document.querySelectorAll('.js-update-quantity-link');

  updateLinks.forEach(uLink => {
      uLink.addEventListener('click', () => {
          let productId = uLink.dataset.prodId;
          const container = document.querySelector(`.js-cart-item-container-${productId}`);
          container.classList.add('is-editing-quantity');
      });
  });


  const saveLinks = document.querySelectorAll('.js-save-quantity-link');

  // saveLinks.forEach(sLink => {
  //     sLink.addEventListener('click', ()=>{
  //         let productId = sLink.dataset.prodId;
  //         const container = document.querySelector(`.js-cart-item-container-${productId}`);
  //         container.classList.remove('is-editing-quantity');

  //         const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  //         const newQuantity = Number(quantityInput.value);

  //         cartModule.updateQuantity(productId, newQuantity);

  //         const quantityUpdate = document.querySelector(`.js-quantity-label-${productId}`);
  //         quantityUpdate.innerHTML = newQuantity;

  //         updateCartQuantity();
  //     });
  // });


  saveLinks.forEach(sLink => {
      let productId = sLink.dataset.prodId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

      sLink.addEventListener('click', () => {
          handleUpdateQuantity(productId, quantityInput);
      });


      quantityInput.addEventListener('keydown', (event)=>{
          if(event.key === 'Enter'){
              handleUpdateQuantity(productId, quantityInput);
          }
      });
  });

  function handleUpdateQuantity(productId, quantityInput){
      const newQuantity = Number(quantityInput.value);

      if(newQuantity <=0 || newQuantity >= 1000){
          alert('Quantity must be atleast 1 and Less than 1000');
      }

      cartModule.updateQuantity(productId, newQuantity);

    //   const quantityUpdate = document.querySelector(`.js-quantity-label-${productId}`);
    //   quantityUpdate.innerHTML = newQuantity;

      rendePaymentSummary();
      renderOrderSummary();
      renderCheckoutHeader();

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
  }


  const deliveryCheckedDate = document.querySelectorAll('.js-delivery-option-input');

  deliveryCheckedDate.forEach(checkedDt => {
      checkedDt.addEventListener('click', ()=> {
          const productId = checkedDt.dataset.prodId;
          const newDeliveryOptionId = checkedDt.dataset.optId;
          cartModule.updateDeliveryOptions(productId, newDeliveryOptionId);
          renderOrderSummary();
          rendePaymentSummary();
          renderCheckoutHeader();
      });
  });

}


renderOrderSummary();