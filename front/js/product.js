/**
 * Product Id Data collect and display for product page
 */

/** Products ID Data collect */
/** Current Page Id info collect */
var urlcourante = document.location.href; 
var url = new URL(urlcourante);
var id = url.searchParams.get("id");
console.log(id);

/** Current Product Id info collect */
let productDetails = [];

const detailsProduct = async () => {
    await fetch("http://localhost:3000/api/products/"+ id)
    .then(details => details.json())
    .then((promiseDetails) => {
        productDetails = promiseDetails;
        console.log(productDetails);
    });  
};

/** API Products Data display */
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
/** 
 * document.getElementById("").innerHTML */