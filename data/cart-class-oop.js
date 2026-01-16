class Cart {

    amazonCart;
    #localStorageKey;

    constructor(storageKey){
        this.#localStorageKey = storageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){

        this.amazonCart= JSON.parse(localStorage.getItem(this.#localStorageKey));

        if(!this.amazonCart){
            this.amazonCart = [{
                productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 2,
                deliveryOptionId : '1'
            }, {
                productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity : 1,
                deliveryOptionId : '2'
            }];
        }
    }

    saveToCartStorage(){
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.amazonCart));
    }


    addToCart(productId){

    // const quantity_ele = document.querySelector(`.js-quantity-selector-${productId}`);
    // let quantity_val = Number(quantity_ele.value);

    let quantity_val = 1;

    let matchingItem;

    this.amazonCart.forEach(cartItem => {
        if(productId === cartItem.productId){
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity += quantity_val;            
    }else{
        this.amazonCart.push({
            productId,
            quantity : quantity_val,
            deliveryOptionId : '1'
        });
    }

    this.saveToCartStorage();

    }


    removeFromCart(productId){
    
        const newCartArr = [];

        this.amazonCart.forEach(cart => {
            if(cart.productId !== productId){
                newCartArr.push(cart);
            }
        });

        amazonCart = newCartArr;

        this.saveToCartStorage();
    }


    calculateCartQuantity(){

        let quantity = 0;
        this.amazonCart.forEach(cartItem => {
            quantity += cartItem.quantity;
        });

        return quantity;

    }


    updateQuantity(productId, newQuantity){
    
        this.amazonCart.forEach(cartItem => {
            if(cartItem.productId === productId){
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToCartStorage();
    }


    updateDeliveryOptions(productId, newDeliveryOptionId){

        let matchingItem;

        this.amazonCart.forEach(cartItem => {
            if(cartItem.productId === productId){
                cartItem.deliveryOptionId = newDeliveryOptionId;
            }
        });

        this.saveToCartStorage();    

    }


}

export const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');