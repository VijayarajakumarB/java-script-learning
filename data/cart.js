export let amazonCart = JSON.parse(localStorage.getItem('amazonCart')) || [];

loadFromStorage();

export function loadFromStorage(){
    if(!amazonCart){
        amazonCart = [{
            product_id : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity : 2,
            deliveryOptionId : 1
        }, {
            product_id : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity : 1,
            deliveryOptionId : 2
        }];
    }
}


function saveToCartStorage(){
    localStorage.setItem('amazonCart', JSON.stringify(amazonCart));
}

export function addToCart(product_id){

    // const quantity_ele = document.querySelector(`.js-quantity-selector-${product_id}`);
    // let quantity_val = Number(quantity_ele.value);

    let quantity_val = 1;

    let matchingItem;

        amazonCart.forEach(cartItem => {
            if(product_id === cartItem.product_id){
                matchingItem = cartItem;
            }
        });

        if(matchingItem){
            matchingItem.quantity += quantity_val;            
        }else{
            amazonCart.push({
                product_id,
                quantity : quantity_val,
                deliveryOptionId : '1'
            });
        }

        saveToCartStorage();

}




export function removeFromCart(productId){
    const newCartArr = [];

    amazonCart.forEach(cart => {
        if(cart.product_id !== productId){
            newCartArr.push(cart);
        }
    });

    amazonCart = newCartArr;

    saveToCartStorage();
}

export function calculateCartQuantity(){

    let quantity = 0;
    amazonCart.forEach(cartItem => {
        quantity += cartItem.quantity;
    });

    return quantity;

}


export function updateQuantity(productId, newQuantity){
    amazonCart.forEach(cartItem => {
        if(cartItem.product_id === productId){
            cartItem.quantity = newQuantity;
        }
    });

    saveToCartStorage();
}


export function updateDeliveryOptions(productId, newDeliveryOptionId){

    let matchingItem;

    amazonCart.forEach(cartItem => {
        if(cartItem.product_id === productId){
            cartItem.deliveryOptionId = newDeliveryOptionId;
        }
    });

    saveToCartStorage();    

}