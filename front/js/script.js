/**
 * API PRODUCTS DATA COLLECT AND DISPLAY ***********************************************************************************
 */

/** 
 * API Products Data collect 
 * */
function productDataCollect(){
    return (
        fetch("http://localhost:3000/api/products")
        .then(data => data.json())
        .then((promiseData) => {
            productCollection = promiseData;
            console.log(productCollection);
        })
    );
};

/** 
 * API Products Data display 
 * */
async function productsDisplay(){
    await productDataCollect();
    let productsData = productCollection;
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

