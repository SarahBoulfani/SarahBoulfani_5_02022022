//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let basket = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(basket);
//-----------------------Affichage produit panier---------------------------

function basketElements(){
if(basket === null){ //si le panier est vide le total est 0 et le message est "Oups , vous n'avez aucun article dans le panier"
    //Récupérer mon élément avec l'id pour insérer les informations de chaque produit dans la page panier
    let cartItems = document.getElementById("cart__items");
    document.getElementById("totalQuantity").textContent = 0;
    document.getElementById("totalPrice").textContent = 0 ;
    //créer l'élément qui va etre afficher si le panier est vide
    let text = document.createElement("h2");
    text.style.textAlign = "center";
    text.textContent = "Oups , vous n'avez aucun article dans votre panier !"
    cartItems.appendChild(text);
  console.log("je suis vide") //teste
}else{ //si le panier n'est pas vide alors on affiche le panier
    console.log("je ne suis pas vide")//teste
    for (let article in basket){  
    //Grâce à l'id des éléments dans le storage on effectue une requête afin de récupérer les articles.
    //fonction pour récupérer les images, le nom, la description et le prix de nos article qui sont dans le panier depuis l'API
   
     async function getArticle(){
      await fetch(`http://localhost:3000/api/products/${basket[article].id}`)

     .then(function(res){
        if(res.ok){
            return res.json()   
        }
    })
    .then(function(data){ 
         product = data
        // console.log(product)      
    }) 
    .catch(function(err){
        console.log(err)
    })
    }
     //Fonction pour afficher nos articles
     async function articleDisplay(){
     await getArticle();
    //créer nos élément dans le DOM
      //article
      let cartItems = document.getElementById("cart__items");
      let articleProduct = document.createElement("article");
      articleProduct.classList.add("cart__item");
      articleProduct.setAttribute("data-id",`${basket[article].id}`); //récupérer l'id de localStorage
      articleProduct.setAttribute("data-color", `${basket[article].colors}`); //récupérer la couleur choisi de localStorage
      cartItems.appendChild(articleProduct);
     // console.log(articleProduct); 
       //image
       let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        articleProduct.appendChild(cartItemImg);
        let img = document.createElement("img");
        img.src = product.imageUrl ;
        img.alt=  product.altTxt;
        cartItemImg.appendChild(img);
        //contenu : description + settings
        let cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        articleProduct.appendChild(cartItemContent);
        //description
        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemContentDescription);
        //description-titre
        let titleDescription = document.createElement("h2");
        titleDescription.textContent = product.name;
        cartItemContentDescription.appendChild(titleDescription);
        //description-colors
        let colorDescription = document.createElement("p");
        colorDescription.textContent = basket[article].colors;
        cartItemContentDescription.appendChild(colorDescription);
        //description-prix
         let priceDescription = document.createElement("p");
         priceDescription.textContent = product.price; 
         priceDescription.valueAsNumber = product.price; //donner une valeur entant que nombre au prix pour la rappeller dans le calcul du total
         cartItemContentDescription.appendChild(priceDescription);

        //settings
        let cartItemContentSettings = document.createElement("div");
        cartItemContentSettings.classList.add("cart__item__content__settings");
        cartItemContent.appendChild(cartItemContentSettings); 
        //settings_quantité 
        let cartItemContentSettingsQuantity = document.createElement("div");
        cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
        cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
       //settings_quantité-texte
       let textQuantity = document.createElement("p");
       textQuantity.textContent = " Qté :" ;
       cartItemContentSettingsQuantity.appendChild(textQuantity);
        //settings_quantité-input
        let itemQuantity = document.createElement("input");
        itemQuantity.classList.add("itemQuantity");
        itemQuantity.setAttribute("type" ,"number");
        itemQuantity.setAttribute("name" ,"itemQuantity");
        itemQuantity.setAttribute("min" ,"1");
        itemQuantity.setAttribute("max" ,"100");
        itemQuantity.setAttribute("value", `${basket[article].quantity}`); //récupérer la quantité de localStorage
        cartItemContentSettingsQuantity.appendChild(itemQuantity);
        //settings_delete
        let cartItemContentSettingsDelete = document.createElement("div");
        cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
        cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
        //settings_delete-item
        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        deleteItem.textContent = "Supprimer";
        cartItemContentSettingsDelete.appendChild(deleteItem);
        //----------------------fin creation des éléments--------------------------//

     //__________________________________________________________________________
     // function qui calcule le prix et la quantité totale
     function total(){
        //cibler les éléments par id ou class 
        let itemQuantity = document.getElementsByClassName("itemQuantity");
        let productTotalQuantity = document.getElementById("totalQuantity");
        let productTotalPrice = document.getElementById("totalPrice");
        let priceDesc = document.querySelectorAll(".cart__item__content__description p:last-child");
        //initialiser mes variables
        let totalPrice = 0;
        let totalQuantity = 0;
        //créer une boucle qui parcourt chaque quantité
        for (let i = 0; i < itemQuantity.length; i++){
               let quantity = itemQuantity[i].valueAsNumber;
               let price = priceDesc[i].valueAsNumber;
               totalQuantity += quantity;
               totalPrice += price * quantity;       
        }
        productTotalQuantity.textContent = totalQuantity;
        productTotalPrice.textContent = totalPrice;
       }
       total();   
    
  }     
   articleDisplay();
   
 } //fin boucle 
 
}//fin else

}
basketElements();









 



