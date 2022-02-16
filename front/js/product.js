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
    console.log(option)
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
const choiceProduct = addToCart.value; //cela me redirige vers la page panier
console.log(choiceProduct);  */
console.log(addToCart);
//Ecouter le bouton 
addToCart.addEventListener('click',(event)=>{

//Récupérer les valeur selectionner par l'utilisateur
let choiceProduct = {
    id : productID,
    colors: selectColor.value,
    quantity : quantity.value
}
console.log(choiceProduct)
});






