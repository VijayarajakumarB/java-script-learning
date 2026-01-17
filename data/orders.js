export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){

    orders.unshift(order)
    saveToStorageOrders();

}

function saveToStorageOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getMatchingProductInfo(orderedId, productId){
    
    let matchingProduct;

    this.orders.forEach((orderItem) => {
        if(orderItem.id === orderedId){
            orderItem.products.forEach((productItem) => {
                if(productItem.productId === productId){
                    matchingProduct = productItem
                }
            });
        }
    });

    return matchingProduct;
}