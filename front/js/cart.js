//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let addLocalStorage = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(addLocalStorage);
//-----------------------Affichage produit panier---------------------------