//Initialiser la variable qui contiendra nos données API
let articles = [];
/*Fonction qui récupére les produits depuis l'API*/
async function getArticles() {
  await fetch('http://localhost:3000/api/products')//await pour attendre que ce code s'exécute pour passer au suivant et du coup avoir du temps pour passer les données dans notre variable
    .then(function (res) {//Appeler la fonction then pour récupérer la réponse de la requete 
      if (res.ok) {
        //  console.log(res) Ceci affiche que nous avons une réponse 
        return res.json() //Réponse sous format json
      }
    })
    .then(function (data) {//Récuperer la réponse dans la fonction then suivante puis l'afficher dans la console
      articles = data; //Stocker nos données dans la variable articles 
      console.log(articles)
    })
    //
    .catch(function (err) {
      console.log(err)
    })
}
/*Fonction qui affiche dynamiquement les articles sur notre page d'accueil*/
async function articlesDisplay() {
  await getArticles(); //Appeler notre fonction qui récupére les données

  for (let article of articles) {
    let items = document.getElementById("items");//Récupérer mon élément avec l'id items
    //Link
    let link = document.createElement("a");//Créer un element a
    link.href = `./product.html?id=${article._id}`; // Pour chaque article dans mon tableau articles je récupére la valeur de ma clé "_id"
    items.appendChild(link);//Afficher l'élement sur ma page web grace à la fonction appendChild
    //Article
    let cart = document.createElement("article");
    link.appendChild(cart);
    //Img
    let image = document.createElement("img");
    image.src = article.imageUrl;
    image.alt = article.altTxt;
    cart.appendChild(image);
    //Titre
    let productName = document.createElement("h3");
    productName.textContent = article.name;
    productName.classList.add("productName");
    cart.appendChild(productName);
    //Description
    let productDescription = document.createElement("p");
    productDescription.textContent = article.description;
    productDescription.classList.add("productDescription");
    cart.appendChild(productDescription);
  }
}
articlesDisplay();

