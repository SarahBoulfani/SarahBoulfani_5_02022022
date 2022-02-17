/*Récupèrer l'id produit depuis l'Url avec URLSearchParams*/
let params = new URLSearchParams(document.location.search);
let productID = params.get("id");
console.log(productID); 

/*Récupérer mon produit depuis l'API grâce à son Id*/
let product = [];
async function getProduct(){
    await fetch(`http://localhost:3000/api/products/${productID}`)
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
  

 /*Récupérer les élémnents HTML avec l'id ou leur classe pour créer et afficher le produit en question dans la page produit*/
    //image
    const item__img = document.querySelector(".item__img");
   
    //Titre du produit
    const title = document.getElementById("title");
    
    //price
    const price = document.getElementById("price");
    
    //description:
    const description = document.getElementById("description");

    //couleur
    const selectColor = document.getElementById("colors");
    //Quantité
    const quantity = document.querySelector("#quantity");

 /*Afficher le produit en question dans la page produit (dans le DOM) avec la fonction productDisplay*/ 
    async function productDisplay(){
    await getProduct();
 //image du produit
    let image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    item__img.appendChild(image);
 /* deuxiéme methode:
    item__img.innerHTML =  `<img src="${product.imageUrl}" alt=${product.altTxt}> `; */
   
 //Titre du produit
    title.textContent = product.name;

 //Prix du produit
    price.textContent = product.price;
   
 //description du produit
    description.textContent = product.description;
   
 //une boucle pour selectionner la couleur : pour dire crée pour le parent selectColor tant d'option quil faut donc tout dépend de la longeur de mon tableau colors avec comme valeur et contenu product.colors[i] 
    for (let i = 0; i < product.colors.length; i++){
    const selectColor = document.getElementById("colors");
    let option = document.createElement("option");
    option.value = product.colors[i];
    option.textContent =  product.colors[i];
    selectColor.appendChild(option); 
} 
}
productDisplay();
//------------------La gestion du panier------------------
/*Récupération des données selectionnées par l'utilisateur et envoie du panier*/

//Afficher la quantité dans la console 
/* console.log(quantity);

quantity.addEventListener('change', (event)=>{
     choiceQuantity = event.target.value; 
     console.log(choiceQuantity);//ceci affiche la quantité saisie dans l'iput quantité
}); */
//Selectionner l'id du bouton ajouter au panier
const addToCart = document.querySelector("#addToCart");
/* //Mettre le choix de l'utilisateur dans une varaiable
const choiceProduct = addToCart.value; //cela me redirige vers la page panier????
console.log(choiceProduct);  */
console.log(addToCart);

//Ecouter le bouton 
addToCart.addEventListener('click',(event)=>{
//Récupérer les valeur selectionnées par l'utilisateur
let choiceProduct = {
    id : productID,
    colors: selectColor.value,
    quantity : quantity.value, // parseInt(quantity.value), //pour l'afficher en nombre et pas en chaine de caractére
}
console.log(choiceProduct);
/*-------------------------------Le localStorage---------------------------*/

//Stocker la recupération des valeur sélectionnées par l'utilisateur
//Déclarer la variable qui va contenir les clés et valeurs qui sont dans le localStorage
 let addLocalStorage = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript 
 //Fonction confirmation fenetre pop up:
 const popupConfirmation = ()=>{
     if(window.confirm(`${product.name} 
     Couleur : ${selectColor.value} , Quantité : ${quantity.value} a bien été ajouter au panier 
     Consulter le panier Ok ou revenir à l'accueil Annuler `  )){
     window.location.href = "cart.html";
     }else{
        window.location.href = "index.html";
     }

 };
 //fonction ajouter un produit au localStorage:
    const addToLocalStorage = ()=>{
    addLocalStorage.push(choiceProduct);//La méthode push() pour ajoute le produit selectionné par l'utilisateur (choiceProduct) dans un tableau (addLocalStorage)
    localStorage.setItem("productAdded", JSON.stringify(addLocalStorage));//la transformation en format JSON et l'envoyer dans la key "productAdded" au localStorage
 };

//S'il y a déja un produit d'enregistré dans le localStorage
if(addLocalStorage ){
    addToLocalStorage();
    console.log(addLocalStorage);//affiche un tableau avec tous les produits selectionnés par l'utilisateur(choiceProduct)
    popupConfirmation();
  //S'il n'y a pas de produit d'enregistré dans le localStorage
}else{
    addLocalStorage = [];
    addToLocalStorage();
    /*----------Envoyer le produit dans le localStorage:------*/
    popupConfirmation();
  
};
});







