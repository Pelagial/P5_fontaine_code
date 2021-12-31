/**
 * ORDER CONFIRMATON PAGE
 */

/** Current Page Id data collect */
var urlcourante = document.location.href; 
var url = new URL(urlcourante);
var orderId = url.searchParams.get("orderId");
console.log(orderId);


function orderConfiramationDisplay(){
    document.querySelector("#orderId").innerHTML = `${orderId}`;
};

orderConfiramationDisplay();
