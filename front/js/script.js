/**
 * API Products Data collect and display
 */

/** API Products Data collect */
let productsData = [];

const listProducts = async () => {
    await fetch("http://localhost:3000/api/products")
    .then(data => data.json())
    .then((promiseData) => {
        productsData = promiseData;
        console.log(productsData);
    });  
};

/** API Products Data display */
const productsDisplay = async () =>{
    await listProducts();
    document.getElementById("items").innerHTML = productsData.map((products) => 
    `<a href="./product.html?id=${products._id}">
    <article>
      <img src="${products.imageUrl}" alt="${products.altTxt}">
      <h3 class="productName">${products.name}</h3>
      <p class="productDescription">${products.description}</p>
    </article>
    </a>`).join("");
};

productsDisplay();

