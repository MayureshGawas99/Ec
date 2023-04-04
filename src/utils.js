export function getItemCount(cartItems){
    return cartItems.reduce((count,cartItem) => cartItem.quantity + count,0)
}

export function getSubtotal(cartItem){
    return cartItem.reduce((sum,{product,quantity})=>product.price*quantity + sum,0)
}

export function getTodayDate(){
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;
    return currentDate
}