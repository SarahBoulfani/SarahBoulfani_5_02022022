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
                itemQuantity.setAttribute("value", `${basket[article].quantity}`); 
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

//***********************************Formulaire de commande*************************************//

//récupérer le formulaire
let form = document.querySelector(".cart__order__form");

//-------------------------------------Validation firstName------------------------------------
console.log(form.firstName); //ceci affiche l'input firstName dans la console 
//écouter la modification de l'input firstName
form.firstName.addEventListener('change', function () {
    validFirstName(this); //this fait référence à l'input firstName donc ce que l'utilisateur est en train de saisir 
});

function validFirstName(inputFirstName) {
    // Création de l'expression régulière pour la validation du prénom
    let firstNameRegExp = new RegExp('^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$', 'g');
    //on teste l'expression régulière
    let testFirstName = firstNameRegExp.test(inputFirstName.value); 
    console.log(testFirstName);// Affichage du résultat dans la console true ou false
    let messageError = inputFirstName.nextElementSibling;//récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testFirstName) {//si le testFirstName est vrai on affiche rien
        messageError.textContent = "";
        return true; //firstName valide la fonction validfirstName retourne vrai

    } else { //sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer un prénom valide";
        return false;// firstName non valide la fonction validfirstName retourne false
    }
};

//-------------------------------------Validation lastName------------------------------------
console.log(form.lastName); //ceci affiche l'input lastName dans la console 
//écouter la modification de l'input lastName
form.lastName.addEventListener('change', function () {
    validLastName(this); //this fait référence à l'input lastName donc ce que l'utilisateur est en train de saisir 
});

function validLastName(inputLastName) {
    // Création de l'expression régulière pour la validation du nom
    let lastNameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //on teste l'expression régulière
    let testLastName = lastNameRegExp.test(inputLastName.value); 
    console.log(testLastName);// Affichage du résultat dans la console true ou false
    let messageError = inputLastName.nextElementSibling;//récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testLastName) {//si le testLastName est vrai on affiche rien
        messageError.textContent = "";
        return true; //lastName valide la fonction validLastName retourne vrai

    } else { //sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer un nom valide";
        return false;// lastName non valide la fonction validLastName retourne false
    }
};

//-------------------------------------Validation adresse------------------------------------
console.log(form.address); //ceci affiche l'input address dans la console 
//écouter la modification de l'input address
form.address.addEventListener('change', function () {
    validAddress(this); //this fait référence à l'input address donc ce que l'utilisateur est en train de saisir 
});

function validAddress(inputAddress) {
    // Création de l'expression régulière pour la validation de l'adresse
    let addressRegExp = new RegExp( "^[a-zA-Z0-9àâäéèêëïîôöùûüÿç,. '-]+$","g");
    //on teste l'expression régulière
    let testAddress = addressRegExp.test(inputAddress.value); 
    console.log(testAddress);// Affichage du résultat dans la console true ou false
    let messageError = inputAddress.nextElementSibling;//récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testAddress) {//si le testAddress est vrai on affiche rien
        messageError.textContent = "";
        return true; // adresse valide la fonction validAddress retourne vrai

    } else { //sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer une adresse valide";
        return false;// adresse non valide la fonction validAddress retourne false
    }
};

//-------------------------------------Validation City------------------------------------
console.log(form.city); //ceci affiche l'input city dans la console 
//écouter la modification de l'input city
form.city.addEventListener('change', function () {
    validCity(this); //this fait référence à l'input city donc ce que l'utilisateur est en train de saisir 
});

function validCity(inputCity) {
    // Création de l'expression régulière pour la validation de la ville
    let cityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //on teste l'expression régulière
    let testCity = cityRegExp.test(inputCity.value); 
    console.log(testCity);// Affichage du résultat dans la console true ou false
    let messageError = inputCity.nextElementSibling;//récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testCity) {//si le testCity est vrai on affiche rien
        messageError.textContent = "";
        return true; //city valide la fonction validCity retourne vrai

    } else { //sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer une ville valide";
        return false;// city non valide la fonction validCity retourne false
    }
};






