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

//________________________________________________
//Afficher la quantité dans la console 
/* console.log(quantity);

quantity.addEventListener('change', (event)=>{
     choiceQuantity = event.target.value; 
     console.log(choiceQuantity);//ceci affiche la quantité saisie dans l'iput quantité
}); */
//________________________________________________
//-----------------------------La gestion du panier------------------------------
/*Récupération des données selectionnées par l'utilisateur et envoie du panier*/
function addBasket(){
//Selectionner l'id du bouton ajouter au panier
const addToCart = document.querySelector("#addToCart");
console.log(addToCart);


//Ecouter le bouton ajouter au panier
addToCart.addEventListener('click',(event)=>{
//Récupérer les valeur selectionnées par l'utilisateur
let choiceProduct = {
    id : productID,
    colors: selectColor.value,
    quantity : parseInt(quantity.value) //parseInt pour l'afficher en nombre et pas en chaine de caractére
}
  console.log(choiceProduct);
 
  //Fonction confirmation fenetre pop up:
  function popupConfirmation(){
    if(window.confirm(`${product.name} 
    Couleur : ${selectColor.value} , Quantité : ${quantity.value} a bien été ajouter au panier 
    Consulter le panier Ok ou revenir à l'accueil Annuler `  )){
    window.location.href = "cart.html";
    }else{
       window.location.href = "index.html";
    }
  };
   
  //On vérifie si une quantité et une couleur ont bien été choisies
   if(choiceProduct.quantity == 0 || choiceProduct.quantity >100 || choiceProduct.colors == "" ){
       alert("Veuillez indiquer une quantité correcte et choisir une couleur")
   }else{
     popupConfirmation();
   }
   //Stocker la recupération des valeur sélectionnées par l'utilisateur
  //Déclarer la variable qui va contenir les clés et valeurs qui sont dans le localStorage
  let addLocalStorage = JSON.parse( localStorage.getItem("productAdded")) ;//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript 

    //fonction ajouter un produit au localStorage:
    function addToLocalStorage(){
        addLocalStorage.push(choiceProduct);//La méthode push() pour ajouter le produit selectionné par l'utilisateur (choiceProduct) dans un tableau (addLocalStorage)
        localStorage.setItem("productAdded", JSON.stringify(addLocalStorage));//la transformation en format JSON et l'envoyer dans la key "productAdded" au localStorage
     };

    //Nous avons deux possibilité
     /*-----(1)-S'il y a déja un produit d'enregistré dans le localStorage-----*/
  if(addLocalStorage !== null){   
    let foundProduct = addLocalStorage.find(p => p.id == choiceProduct.id && choiceProduct.colors == p.colors) //find est une fonction qui travaille sur les tableau et qui permet de chercher un elelment sur un tableau par rapport à une condition, find() si elle trouve l'element elle va retourner l'element en question sinon elle retourne undefined 
    if (foundProduct != undefined){
     foundProduct.quantity =  choiceProduct.quantity + foundProduct.quantity;
     //mise à jour du panier
     localStorage.setItem("productAdded", JSON.stringify(addLocalStorage));
    }else if(addLocalStorage){ //sinon s'il y a deja un produit avec id et couleur différents on crée un nouveau objet dans le panier
        addToLocalStorage();
    }
    console.log(addLocalStorage);//affiche un tableau avec tous les produits selectionnés par l'utilisateur(choiceProduct)
   
  //-----(2)-S'il n'y a pas de produit d'enregistré dans le localStorage alors on crée le premier objet
}else{  
    addLocalStorage = [];
    addToLocalStorage(); 
}
});
}
addBasket();




 
