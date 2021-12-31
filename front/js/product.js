/**
 * PRODUCTS DATA COLLECT AND DISPLAY ***********************************************************************************
 */

/** 
 * Products Data collect ************************************
 * */

/** Current Page Id data collect */
function currentPoductIdCollect(){
    var urlcourante = document.location.href; 
    var url = new URL(urlcourante);
    var id = url.searchParams.get("id");
    console.log(id);
    return id;
};



/** Current Product data collect */
async function currentProductDataCollect(){
    let id = currentPoductIdCollect();
    console.log(id);
    return(
        fetch("http://localhost:3000/api/products/"+ id)
        .then(details => details.json())
        .then((promiseDetails) => {
            productDetails = promiseDetails;
            console.log(productDetails);
        })
    );   
};

/** 
 * Products data display ************************************
 * */

async function displayDetailsProduct(){
    await currentProductDataCollect();

/** Product data display part */
    document.querySelector(".item__img").innerHTML = 
    `<img src="${productDetails.imageUrl}" alt="${productDetails.altTxt}"/>`;
    document.getElementById("title").innerHTML = `${productDetails.name}`;
    document.getElementById("price").innerHTML = `${productDetails.price}`;
    document.getElementById("description").innerHTML = `${productDetails.description}`;

/** Colors select display part */
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
 *  Add to basket functions ************************************
 * */

/** save basket data to localStorage */
function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
};

/** prodcut data collection */
function selectedProd(){
    currentProductDataCollect();
    let productData = {    
        id : productDetails._id, 
        imageUrl: productDetails.imageUrl,
        altTxt: productDetails.altTxt,
        name : productDetails.name,
        price : productDetails.price,
        colorSelected : document.getElementById("colors").value,
        quantitySelected : document.getElementById("quantity").value
    };
    console.log(productData);
    return productData
};

/** localStorage content verification */
function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket == null){
        console.log("localStorage is empty");
        return [];
    }
    else{
        console.log("localStorage update");
        return JSON.parse(basket);
    }
};

/** main function to add product to basket localStorage */
function addToBasket(){
    let basket = getBasket();
    basketProducts = selectedProd();

/** Product quantity upadate if id and color is the same */
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

/** button add to cart function */
function buttonAddToBasket(){
    document.getElementById("addToCart")
    .addEventListener("click", (event) => {
        event.preventDefault();

        addToBasket()
    });
};
buttonAddToBasket();

