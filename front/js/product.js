//Récupèrer l'id produit depuis l'Url avec URLSearchParams
let params = new URLSearchParams(document.location.search);
let productID = params.get("id");
console.log(productID); 

//Récupérer mon produit depuis l'API grâce à son Id
let product = [];
async function getProduct(){
    await fetch(`http://localhost:3000/api/products/${productID}`)
    .then(function(res){
        if(res.ok){
            return res.json() 
          
        }
        console.log(res) //ceci affiche  les différentes informations du produit en question 
    })
    .then(function(data){
        product = data; 
      console.log(product) 
    })
    
    .catch(function(err){
        console.log(err)
    })
    }
  

    //Selectionner l'id ou les classes ou je vais injecter le code HTML
    //image
    const item__img = document.querySelector(".item__img");
    console.log(item__img);

    //price
    const titlePrice = document.getElementById("title");
    const price = document.getElementById("price");
    
    //description:
    const description = document.getElementById("description");

    //couleur
    const colors = document.getElementById("colors");

    //Afficher le produit en question dans la page produit (dans le DOM) avec la fonction productDisplay
    async function productDisplay(){
    await getProduct();
    //image
    let image = document.createElement("img");
    image.src = product.imageUrl;
    image.alt = product.altTxt;
    item__img.appendChild(image);
 /* deuxiéme methode:
    item__img.innerHTML =  `<img src="${product.imageUrl}" alt=${product.altTxt}> `; */
   
//Price
    titlePrice.textContent = product.name;
    price.textContent = product.price;
   
//description
    description.textContent = product.description;
   
//couleur
    for (let i = 0; i < product.colors.length; i++){
    let option = document.createElement("option");
    option.textContent =  product.colors[i];
    colors.appendChild(option); 
    console.log(option)
} 
}
productDisplay();
