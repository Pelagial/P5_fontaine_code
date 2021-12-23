/** 
 * Basket data collect and display
 * */

 /** Get basket from localStorage */
let basketData = JSON.parse(localStorage.getItem("basket"));
console.log(basketData);
 
/** Display cart */
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








  




  
  
  
