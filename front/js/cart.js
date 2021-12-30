/** 
 * Basket data collect and display
 * */

 /** Get basket from localStorage */
let basketData = JSON.parse(localStorage.getItem("basket"));
console.log(basketData);
 
/** Display cart */
function displayBasket(){
const displayCart = document.querySelector("#cart__items");
console.log(displayCart);
    
let displayCartContents=[];

for(i=0; i < basketData.length; i++){  
    displayCartContents = displayCartContents + 
    `<article class="cart__item" data-id="${basketData[i].id}" data-color="${basketData[i].colorSelected}">
        <div class="cart__item__img">
        <img src="${basketData[i].imageUrl}" alt="${basketData[i].altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${basketData[i].name}</h2>
                <p>${basketData[i].colorSelected}</p>
                <p>${basketData[i].price} €</p>
            </div>
            <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketData[i].quantitySelected}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
            </div>
        </div>
    </article>`;
}

if(i === basketData.length);
displayCart.innerHTML = displayCartContents;
};
displayBasket();
/** 
 * Basket functions
 * */

/** 
 * Delete a product of cart
 * */

 function deletButton(){

/** Select all the delet button */
        let deletBtn = Array.from(document.querySelectorAll(".deleteItem"));
        console.log(deletBtn);
    
/** Target the current delet button */
        for(let button = 0; button < deletBtn.length; button++){
            deletBtn[button].addEventListener("click",(event) =>{
                event.preventDefault();
    
/** Get the Id of product to delet */
                let idProductToDelet = basketData[button].id;
                console.log(idProductToDelet);
    
/** Deleted element from local storage using splice */          
                basketData.splice(
                    [button],1);
                console.log(basketData);

/** Upload local storage and reload the page */      
                localStorage.setItem("basket", JSON.stringify(basketData));
                
                window.location.href = "cart.html";
            }) 
        };
    
};
deletButton();


/** 
 * Change Quantity of product in cart
 * */
 function changeQuantityInCart(){

/** Select all the quantity input */
    let quantityInCart = Array.from(document.querySelectorAll(".itemQuantity"));
    console.log(quantityInCart);

/** Target the current quantity input */
    for(let input = 0; input < quantityInCart.length; input++){
        quantityInCart[input].addEventListener("change",(event) =>{
            event.preventDefault();

/** Get the quantity of selected product */
            let quantityOfCurrentProduct = quantityInCart[input].value;
            console.log(quantityOfCurrentProduct);   

/** Add new quantity to local storage using splice */ 
            let cartData = {    
                id : basketData[input].id, 
                imageUrl: basketData[input].imageUrl,
                altTxt: basketData[input].altTxt,
                name : basketData[input].name,
                price : basketData[input].price,
                colorSelected : basketData[input].colorSelected,
                quantitySelected : quantityOfCurrentProduct
            };
            basketData.splice(
            [input],1,
            cartData);
            console.log(basketData);


/** Upload local storage and reload the page */      
            localStorage.setItem("basket", JSON.stringify(basketData));

            window.location.href = "cart.html";  
        });
    };
};
changeQuantityInCart();


/** 
 * Get total price in cart
 * */

let totalPrice =[];
let totalQuantity =[];

/** Get total price of product in cart */
/** Get price of product in cart and multiply for each quantity */
for(let total = 0; total < basketData.length; total++){
    let productInCartPrice = basketData[total].price;
    let productsQuantityInCart = basketData[total].quantitySelected;
    let convertQuantityToNumber = parseInt(productsQuantityInCart);
    let cartPriceAndQuantity = convertQuantityToNumber * productInCartPrice;
    totalPrice.push(cartPriceAndQuantity);
    console.log(totalPrice);
    totalQuantity.push(convertQuantityToNumber);
    console.log(totalQuantity);
};

/** Calculate the total price */
const price = (accumulator, currentValue) => accumulator + currentValue;
const totalPriceCalcul = totalPrice.reduce(price,0);

console.log(totalPriceCalcul);

/** Calculate the total number of products */
const quantity = (accumulator, currentValue) => accumulator + currentValue;
const totalQuantityCalcul = totalQuantity.reduce(quantity,0);

console.log(totalQuantityCalcul);


/** Display total price and quantity of product in cart */

function displayTotalPrice(){
    const displayPrice = document.querySelector("#totalPrice");
    displayPrice.innerHTML = `${totalPriceCalcul}`
};
displayTotalPrice();

function displayTotalQuantity(){
    const displayPrice = document.querySelector("#totalQuantity");
    displayPrice.innerHTML = `${totalQuantityCalcul}`;
 };
displayTotalQuantity();
  


/**
 * Formular Fonction
 */


/** 
 * Collect & verification of formular Data */

/** Collect fromular data */
function formularInputs(){
    let formularData = {
        firstName : document.querySelector("#firstName").value,
        lastName : document.querySelector("#lastName").value,
        address : document.querySelector("#address").value,
        city : document.querySelector("#city").value,
        email : document.querySelector("#email").value
    };
    return formularData;
};

/** Verification fromular data */

/** First Name verification */
function validationFirstName(){
    const formularToValidate = formularInputs();
    const firstName = formularToValidate.firstName;
   
    if (/^[a-zA-Z]{3,40}$/.test(firstName)){
        return true;
    }
    else{
        firstNameErrorMsg =  document.querySelector("#firstNameErrorMsg");
        firstNameErrorMsg.innerHTML = "le prénom doit avoir entre 3 et 40 caracteres sans chiffres ni symboles";
        return false;
    }
};

/** Last Name verification */ 
function validationLastName(){
    const formularToValidate = formularInputs();
    const lastName = formularToValidate.lastName;

    if(/^[a-zA-Z]{3,30}$/.test(lastName)){
        return true;
    }
    else{
        lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
        lastNameErrorMsg.innerHTML = "le nom doit avoir entre 3 et 30 caracteres sans aucun chiffre ni symboles";
        return false;
    }
};

/** Address verification */  
function validationAddress(){
    const formularToValidate = formularInputs();
    const address = formularToValidate.address;

    if(/(?:\d{0,3} +(cours|bis|ter|quat)|\G(?<!^)) (\S+)/.test(address)){
        return true;
    } 
    else{
        addressErrorMsg = document.querySelector("#addressErrorMsg");
        addressErrorMsg.innerHTML = "l'adresse doit etre avec de 1 à 3 chiffres et 10 à 50 lettres ou chiffres";
        return false;
    }
};

/** City verification */  
function validationCity(){
    const formularToValidate = formularInputs();
    const city = formularToValidate.city;

    if(/^[a-zA-Z]{3,40}$/.test(city)){
        return true;
    } 
    else{
        cityErrorMsg = document.querySelector("#cityErrorMsg");
        cityErrorMsg.innerHTML = "la ville doit etre avec 3 à 40 lettres sans chiffres ni symboles";
        return false;
    }
};

/** Email verification */ 
function validationEmail(){
    const formularToValidate = formularInputs();
    const email = formularToValidate.email;

    if(/^[a-zA-Z]{5,30}@[a-z\._-]{5,20}$/.test(email)){
        return true;
    }
    else{
        emailErrorMsg = document.querySelector("#emailErrorMsg");
        emailErrorMsg.innerHTML = " l'email doit avoir de 5 à 30 lettres et/ou chiffres le symbole @ et 5 à 20 lettres et/ou chiffres et le symbole . (point)";
        return false;
    }
};

/** 
 * Creat order data (product in cart and formular data) */
function orderDataCreation(){
    let order = [];
    orderSubmition = formularInputs();
    orderProducts = basketData;
    order.push(orderSubmition);
    order.push(orderProducts);

    return order;
};

/**
 * Send Order data to the back */
 function sendOrderData(){
    fetch("http://localhost:3000/api/order")
};

/**
 * Button Submit function */
function orderButton(){
    const submitButton = document.querySelector("#order");
    submitButton.addEventListener("click", (orderConfirmation) =>{
        orderConfirmation.preventDefault;
        if (validationFirstName() && validationLastName() && validationAddress() && validationCity() && validationEmail()){
            orderData = orderDataCreation();
            
            localStorage.setItem("order", JSON.stringify(orderData));
            sendOrderData();
        }
        else{
            
        }
    });
};
orderButton();            

