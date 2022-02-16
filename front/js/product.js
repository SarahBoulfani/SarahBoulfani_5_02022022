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
  

 /*Récupérer les élémnents avec l'id ou leur classe pour créer et afficher le produit en question dans la page produit*/
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
   
//une boucle pour selectionner la couleur  
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

