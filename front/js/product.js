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
        console.log(res) //ceci affiche le produit en question 
    })
    .then(function(data){
        product = data; 
      console.log(product) 
    })
    
    .catch(function(err){
        console.log(err)
    })
    }
    getProduct();