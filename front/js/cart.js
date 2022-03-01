//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let basket = JSON.parse(localStorage.getItem("productAdded"));//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(basket);
//-----------------------Affichage produit panier---------------------------

function basketElements() {
    if (basket == null || basket == 0) { //si le panier est vide le total est 0 et le message est "Oups , vous n'avez aucun article dans le panier" 
        let cartItems = document.getElementById("cart__items");
        document.getElementById("totalQuantity").textContent = 0;
        document.getElementById("totalPrice").textContent = 0;
        //créer l'élément qui va etre afficher si le panier est vide
        let text = document.createElement("h2");
        text.style.textAlign = "center";
        text.textContent = "Oups , vous n'avez aucun article dans votre panier !"
        cartItems.appendChild(text);
        //si nous n'avons aucun article dans le panier, on supprime le localStorage
        localStorage.clear();
        console.log("je suis vide") //teste
    } else { //si le panier n'est pas vide alors on affiche le panier
        console.log("je ne suis pas vide")//teste
        for (let article in basket) {
            //Grâce à l'id des éléments dans le storage on effectue une requête afin de récupérer les articles.
            //fonction pour récupérer les images, le nom, la description et le prix de nos article qui sont dans le panier depuis l'API

            async function getArticle() {
                await fetch(`http://localhost:3000/api/products/${basket[article].id}`)

                    .then(function (res) {
                        if (res.ok) {
                            return res.json()
                        }
                    })
                    .then(function (data) {
                        product = data
                        // console.log(product)      
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
            //Fonction pour afficher nos articles
            async function articleDisplay() {
                await getArticle();
                //créer nos élément dans le DOM
                //article
                let cartItems = document.getElementById("cart__items");
                let articleProduct = document.createElement("article");
                articleProduct.classList.add("cart__item");
                articleProduct.setAttribute("data-id", `${basket[article].id}`);
                articleProduct.setAttribute("data-color", `${basket[article].colors}`);
                cartItems.appendChild(articleProduct);
                // console.log(articleProduct); 
                //image
                let cartItemImg = document.createElement("div");
                cartItemImg.classList.add("cart__item__img");
                articleProduct.appendChild(cartItemImg);
                let img = document.createElement("img");
                img.src = product.imageUrl;
                img.alt = product.altTxt;
                cartItemImg.appendChild(img);
                //contenu : description + settings
                let cartItemContent = document.createElement("div");
                cartItemContent.classList.add("cart__item__content");
                articleProduct.appendChild(cartItemContent);
                //description
                let cartItemContentDescription = document.createElement("div");
                cartItemContentDescription.classList.add("cart__item__content__description");
                cartItemContent.appendChild(cartItemContentDescription);
                //description-titre
                let titleDescription = document.createElement("h2");
                titleDescription.textContent = product.name;
                cartItemContentDescription.appendChild(titleDescription);
                //description-colors
                let colorDescription = document.createElement("p");
                colorDescription.textContent = basket[article].colors;
                cartItemContentDescription.appendChild(colorDescription);
                //description-prix
                let priceDescription = document.createElement("p");
                priceDescription.textContent = product.price;
                cartItemContentDescription.appendChild(priceDescription);
                //settings
                let cartItemContentSettings = document.createElement("div");
                cartItemContentSettings.classList.add("cart__item__content__settings");
                cartItemContent.appendChild(cartItemContentSettings);
                //settings_quantité 
                let cartItemContentSettingsQuantity = document.createElement("div");
                cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                //settings_quantité-texte
                let textQuantity = document.createElement("p");
                textQuantity.textContent = " Qté :";
                cartItemContentSettingsQuantity.appendChild(textQuantity);
                //settings_quantité-input
                let itemQuantity = document.createElement("input");
                itemQuantity.classList.add("itemQuantity");
                itemQuantity.setAttribute("type", "number");
                itemQuantity.setAttribute("name", "itemQuantity");
                itemQuantity.setAttribute("min", "1");
                itemQuantity.setAttribute("max", "100");
                itemQuantity.setAttribute("value", `${basket[article].quantity}`); //récupérer la quantité de localStorage
                cartItemContentSettingsQuantity.appendChild(itemQuantity);
                //settings_delete
                let cartItemContentSettingsDelete = document.createElement("div");
                cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
                cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                //settings_delete-item
                let deleteItem = document.createElement("p");
                deleteItem.classList.add("deleteItem");
                deleteItem.textContent = "Supprimer";
                cartItemContentSettingsDelete.appendChild(deleteItem);
                //----------------------fin creation des éléments--------------------------//

                //__________________________________________________________________________
                // fonction qui calcule le prix et la quantité totale
                function total() {
                    //récupérer les éléments par id ou class 
                    let productQuantity = document.querySelectorAll(".itemQuantity");
                    let productPrice = document.querySelectorAll(".cart__item__content__description p:last-child");
                    let productTotalQuantity = document.getElementById("totalQuantity");
                    let productTotalPrice = document.getElementById("totalPrice");

                    //initialiser mes variables
                    let totalPrice = 0;
                    let totalQuantity = 0;
                    //créer une boucle qui parcourt chaque quantité
                    for (let i = 0; i < productQuantity.length; i++) {
                        let quantity = Number(productQuantity[i].value);
                        let price = parseFloat(productPrice[i].textContent);
                        //console.log(productPrice[i].textContent);
                        totalQuantity += quantity;
                        totalPrice += price * quantity;
                    }
                    //afficher le totalQuantity et totalPrice
                    productTotalQuantity.textContent = totalQuantity;
                    productTotalPrice.textContent = totalPrice;

                }
                total();


                //___________________________________________________________________
                //Fonction qui permet de modifier la quantité  
                function modifQuantity() {
                    //on récupére l'input de la quantité à modifier
                    productQuantity = document.querySelectorAll(".itemQuantity");
                    productQuantity.forEach((item) => {
                        //récupérer nos articles
                        let cartArticle = item.closest("article");
                        // console.log(cartArticle);
                        //récupèrer l'id et la couleur de l'article grâce au dataset
                        let idData = cartArticle.dataset.id;
                        let colorData = cartArticle.dataset.color;
                        //on déclare la variable qui va recevoir la nouvelle quantité
                        let newQuantity = "";
                        //on écoute l'input lorsque celui-ci change
                        item.addEventListener("change", (event) => {
                            newQuantity = event.target.value;
                            console.log(newQuantity);
                            //on crée une boucle pour trouver l'élément qui a été ciblé grâce à son id et sa couleur et effectuer la mise à jour de la quantité
                            for (let i = 0; i < basket.length; i++) {
                                if (basket[i].id == idData && basket[i].colors == colorData) {
                                    basket[i].quantity = newQuantity;
                                    console.log(newQuantity);
                                }
                            }
                            // mise à jour des totals en chargeant la page 
                            location.reload();
                            //mise à jour du LocalStorage
                            localStorage.setItem("productAdded", JSON.stringify(basket));
                        })
                    })
                }
                modifQuantity();
                //__________________________________________________________________________
                //Fonction qui permet de supprimer un produit 
                function deleteProduct() {
                    //on récupére les boutons supprimer
                    let deleteItem = document.querySelectorAll(".deleteItem");
                    //on crée une boucle sur les boutons supprimer
                    deleteItem.forEach((item) => {
                        //on écoute le clic sur le bouton supprimer ciblé
                        item.addEventListener("click", (event) => {
                            //closest renvoie l'élément ancêtre le plus proche, donc article qui englobe le bouton supprimer 
                            let cartArticle = item.closest("article");
                            // console.log(cartArticle);
                            //on récupére l'id et la couleur des articles grâce au dataset 
                            let idData = cartArticle.dataset.id;
                            console.log(idData);
                            let colorData = cartArticle.dataset.color;
                            //Avec la méthode filter on selectionne les élément à garder et on supprime l'élément où le bouton supprimer a été cliqué du tableau basket
                            basket = basket.filter((element) => element.id !== idData || element.colors !== colorData);
                            console.log(basket);
                            //mise à jour du localStorage
                            localStorage.setItem("productAdded", JSON.stringify(basket));
                            //supprimer l'articles du DOM
                            cartArticle.remove();
                            // mise à jour des totals en chargeant la page 
                            location.reload();
                        });
                    });
                }
                deleteProduct();
            }
            articleDisplay();

        } //fin boucle 

    }//fin else

}
basketElements();



