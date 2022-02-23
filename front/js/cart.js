//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let basket = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(basket);
//-----------------------Affichage produit panier---------------------------
//Afficher les produits dans la page panier
//Récupérer mon élément avec l'id pour insérer les informations de chaque produit dans la page panier
let cartItems = document.getElementById("cart__items");
console.log(cartItems);
//si le panier est vide alors la quantité et le prix sont 0 et le message est "Vous n'avez aucun article dans le panier"
function basketElements(){
if(basket === null){
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
    //fonction pour récupérer les images, le nom, la description et le prix de nos article depuis l'API
     async function getArticle(){
      await fetch(`http://localhost:3000/api/products/${basket[article].id}`)

     .then(function(res){
        if(res.ok){
            return res.json()   
        }
    })
    .then(function(data){
           product = data;
      console.log(product) 
    })
    
    .catch(function(err){
        console.log(err)
    })
     }
     //Fonction pour afficher nos articles
     async function articleDisplay(){
     await getArticle();
    //créer nos élément dans le DOM
      //-1) article
      let cartItems = document.getElementById("cart__items");
      let articleProduct = document.createElement("article");
      articleProduct.classList.add("cart__item");
      articleProduct.setAttribute("data-id",`${basket[article].id}`);
      articleProduct.setAttribute("data-color", `${basket[article].colors}`);
      cartItems.appendChild(articleProduct);
      console.log(articleProduct);
       //-2) image
       let cartItemImg = document.createElement("div");
        cartItemImg.classList.add("cart__item__img");
        articleProduct.appendChild(cartItemImg);
        let img = document.createElement("img");
        img.src = product.imageUrl ;
        img.alt=  product.altTxt;
        cartItemImg.appendChild(img);
        //-3) contenu : description + settings
        let cartItemContent = document.createElement("div");
        cartItemContent.classList.add("cart__item__content");
        articleProduct.appendChild(cartItemContent);
        //-3)-1-description
        let cartItemContentDescription = document.createElement("div");
        cartItemContentDescription.classList.add("cart__item__content__description");
        cartItemContent.appendChild(cartItemContentDescription);
        //-3)-1-description-titre
        let titleDescription = document.createElement("h2");
        titleDescription.textContent = product.name;
        cartItemContentDescription.appendChild(titleDescription);

     }     
    articleDisplay();
    }
    

    }
 

}
basketElements();
