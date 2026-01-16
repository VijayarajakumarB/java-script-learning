export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order){

    orders.unshift(order)
    saveToStorageOrders();

}

function saveToStorageOrders(){
    localStorage.setItem('orders', JSON.stringify(orders));
}