function Cart(){
    const cart = {

    amazonCart : undefined,

    loadFromStorage(){

        this.amazonCart= JSON.parse(localStorage.getItem('amazonCart-oop'));

        if(!this.amazonCart){
            this.amazonCart = [{
                product_id : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 2,
                deliveryOptionId : 1
            }, {
                product_id : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity : 1,
                deliveryOptionId : 2
            }];
        }
    },


    saveToCartStorage(){
        localStorage.setItem('amazonCart-oop', JSON.stringify(this.amazonCart));
    },

    addToCart(product_id){

    // const quantity_ele = document.querySelector(`.js-quantity-selector-${product_id}`);
    // let quantity_val = Number(quantity_ele.value);

    let quantity_val = 1;

    let matchingItem;

    this.amazonCart.forEach(cartItem => {
        if(product_id === cartItem.product_id){
            matchingItem = cartItem;
        }
    });

    if(matchingItem){
        matchingItem.quantity += quantity_val;            
    }else{
        this.amazonCart.push({
            product_id,
            quantity : quantity_val,
            deliveryOptionId : '1'
        });
    }

    this.saveToCartStorage();

    },

    removeFromCart(productId){
    
        const newCartArr = [];

        this.amazonCart.forEach(cart => {
            if(cart.product_id !== productId){
                newCartArr.push(cart);
            }
        });

        amazonCart = newCartArr;

        this.saveToCartStorage();
    },


    calculateCartQuantity(){

        let quantity = 0;
        this.amazonCart.forEach(cartItem => {
            quantity += cartItem.quantity;
        });

        return quantity;

    },

    updateQuantity(productId, newQuantity){
    
        this.amazonCart.forEach(cartItem => {
            if(cartItem.product_id === productId){
                cartItem.quantity = newQuantity;
            }
        });

        this.saveToCartStorage();
    },


    updateDeliveryOptions(productId, newDeliveryOptionId){

        let matchingItem;

        this.amazonCart.forEach(cartItem => {
            if(cartItem.product_id === productId){
                cartItem.deliveryOptionId = newDeliveryOptionId;
            }
        });

        this.saveToCartStorage();    

    }

};
}


const cart = Cart();

console.log(cart);