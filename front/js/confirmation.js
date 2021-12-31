/**
 * ORDER CONFIRMATON PAGE ***********************************************************************************
 */

/** 
 * Order Id data collect ************************************
 * */

function currentOrderIdCollect(){
    var urlcourante = document.location.href; 
    var url = new URL(urlcourante);
    var orderId = url.searchParams.get("orderId");
    console.log(orderId);
    return orderId;
};

/** 
 * Order Id display ************************************
 * */

function orderConfiramationDisplay(){
    id = currentOrderIdCollect();
    document.querySelector("#orderId").innerHTML = `${id}`;
};
orderConfiramationDisplay();
