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
  

    //Selectionner la classe ou je vais injecter le code HTML
    //image
    const item = document.querySelector(".item")
    console.log(item);
    const item__img = document.querySelector(".item__img");
    console.log(item__img);

    //price
  /*   const item__content = document.querySelector(".item__content");
    const item__content__titlePrice = document.querySelector(".item__content__titlePrice"); */
    const titlePrice = document.getElementById("title");
    const price = document.getElementById("price");
    
    //description:
    const description = document.getElementById("description");
    //Afficher le produit dans la page Produit (dans le DOM) avec la fonction productDisplay
    async function productDisplay(){
    await getProduct();
    //image
    let image = document.createElement("img");
    image.src = `${product.imageUrl}`;
    image.alt = `${product.altTxt}`;
    item__img.appendChild(image);
 /* deuxiéme methode:
    item__img.innerHTML =  `<img src="${product.imageUrl}" alt=${product.altTxt}> `; */
   
    //Price
   titlePrice.textContent = `${product.name}`;
   price.textContent = `${product.price}`;
   
   //description
  description.textContent = `${product.description}`;
    
   


    }
productDisplay();
