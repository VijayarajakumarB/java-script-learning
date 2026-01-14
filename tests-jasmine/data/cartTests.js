import {addToCart, amazonCart, loadFromStorage} from '../../data/cart.js';

describe('Test Suite : addToCart from Cart', () => {

   it('Adding Product to cart', () =>{
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(amazonCart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(amazonCart[0].product_id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(amazonCart[0].quantity).toEqual(1);
    });


    it('Add product to an existing cart item', () => {
        spyOn(localStorage, 'setItem');

        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                product_id : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity : 1,
                deliveryOptionId : '1'
            }]);
        });

        loadFromStorage();

        addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(amazonCart.length).toEqual(1);
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(amazonCart[0].product_id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(amazonCart[0].quantity).toEqual(2);
    });
});