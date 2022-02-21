//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let addLocalStorage = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(addLocalStorage);
//-----------------------Affichage produit panier---------------------------
//Afficher les produits dans la page panier
//Récupérer mon élément avec l'id pour insérer les informations de chaque produit dans la page panier
let cartItems = document.getElementById("cart__items");
console.log(cartItems);
