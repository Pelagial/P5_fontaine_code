/**
 * Products Data collect and display for product page
 */

/** Products Data collect */
/** Current Page Id data collect */
var urlcourante = document.location.href; 
var url = new URL(urlcourante);
var id = url.searchParams.get("id");
console.log(id);

/** Current Product data collect */
const detailsProduct = async () => {
    await fetch("http://localhost:3000/api/products/"+ id)
    .then(details => details.json())
    .then((promiseDetails) => {
        productDetails = promiseDetails;
    });  
};

/** Products data display */
const displayDetailsProduct = async () =>{
    await detailsProduct();

    document.querySelector(".item__img").innerHTML = 
    `<img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}"/>`;
    document.getElementById("title").innerHTML = `${productDetails.name}`;
    document.getElementById("price").innerHTML = `${productDetails.price}`;
    document.getElementById("description").innerHTML = `${productDetails.description}`;

    /** Colors select part */
    let colorSelect = document.getElementById("colors");

    productDetails.colors.forEach((color) => {
        let colorValue = document.createElement("option")
        colorValue.innerHTML = `${color}`;
        colorValue.value = `${color}`;

        colorSelect.appendChild(colorValue);
    });
    
};

displayDetailsProduct();

/** Add to basket functions*/
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
};

function selectedProd(){
    detailsProduct();
    let productData = {    
        id : productDetails._id, 
        imageUrl: productDetails.imageUrl,
        altTxt: productDetails.altTxt,
        name : productDetails.name,
        price : productDetails.price,
        colorSelected : document.getElementById("colors").value,
        quantitySelected : document.getElementById("quantity").value
    };
    return productData
};

function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket == null){
        return [];
    }
    else{
        return JSON.parse(basket);
    }
};

function addTobasket(){
    let basket = getBasket();
    basketProducts = selectedProd();
    let foundProduct = basket.find(i => i.id == basketProducts.id);
    console.log(foundProduct);
    let foundColor =  basket.find(c => c.colorSelected == basketProducts.colorSelected);
    console.log(foundColor);
    if(foundProduct != undefined){
        if(foundColor != undefined){
            foundColor.quantitySelected++;
        }else{
            basketProducts = selectedProd();
            basket.push(basketProducts);
        }
    }
    else{
        basketProducts = selectedProd();
        basket.push(basketProducts);
    };
    saveBasket(basket);
};

document.getElementById("addToCart")
    .addEventListener("click", () => {
        addTobasket()
});
