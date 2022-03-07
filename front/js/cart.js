//Récupérer avec getItem la variable qui va contenir les clés et valeurs qui sont dans le localStorage
let basket = JSON.parse(localStorage.getItem("productAdded"));//JSON.parse() pour convertir les données au format JSON qui sont dans le locaStorage en objet JavaScript
console.log(basket);
/*-----------------------Affichage produits panier---------------------------*/
let product = [];//Déclarer la variable qui contiendra nos données API
function basketElements() {
    if (basket == null || basket == 0) { //-(1)-si le panier est vide le total est 0 et le message est "Oups , vous n'avez aucun article dans le panier" 
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
    } else { //-(2)-si le panier n'est pas vide alors on affiche le panier
        console.log("je ne suis pas vide")//teste
        for (let article in basket) {
            //Grâce à l'id des éléments dans le storage on effectue une requête afin de récupérer les articles.
            /*Fonction qui récupérer les images, le nom, la description et le prix de nos produits qui sont dans le panier depuis l'API grâce à leur id*/
            async function getArticle() {
                await fetch(`http://localhost:3000/api/products/${basket[article].id}`)

                    .then(function (res) {
                        if (res.ok) {
                            return res.json()
                        }
                    })
                    .then(function (data) {
                        product = data
                        //console.log(product)      
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }
            /*Fonction pour afficher nos articles*/
            async function articleDisplay() {
                await getArticle();
                //Créer nos élément dans le DOM
                //Article
                let cartItems = document.getElementById("cart__items");
                let articleProduct = document.createElement("article");
                articleProduct.classList.add("cart__item");
                articleProduct.setAttribute("data-id", `${basket[article].id}`);
                articleProduct.setAttribute("data-color", `${basket[article].colors}`);
                cartItems.appendChild(articleProduct);
                // console.log(articleProduct); 
                //Image
                let cartItemImg = document.createElement("div");
                cartItemImg.classList.add("cart__item__img");
                articleProduct.appendChild(cartItemImg);
                let img = document.createElement("img");
                img.src = product.imageUrl;
                img.alt = product.altTxt;
                cartItemImg.appendChild(img);
                //Contenu : description + settings
                let cartItemContent = document.createElement("div");
                cartItemContent.classList.add("cart__item__content");
                articleProduct.appendChild(cartItemContent);
                //Description
                let cartItemContentDescription = document.createElement("div");
                cartItemContentDescription.classList.add("cart__item__content__description");
                cartItemContent.appendChild(cartItemContentDescription);
                //Description-titre
                let titleDescription = document.createElement("h2");
                titleDescription.textContent = product.name;
                cartItemContentDescription.appendChild(titleDescription);
                //Description-colors
                let colorDescription = document.createElement("p");
                colorDescription.textContent = basket[article].colors;
                cartItemContentDescription.appendChild(colorDescription);
                //Description-prix
                let priceDescription = document.createElement("p");
                priceDescription.textContent = product.price;
                cartItemContentDescription.appendChild(priceDescription);
                //Settings
                let cartItemContentSettings = document.createElement("div");
                cartItemContentSettings.classList.add("cart__item__content__settings");
                cartItemContent.appendChild(cartItemContentSettings);
                //Settings_quantité 
                let cartItemContentSettingsQuantity = document.createElement("div");
                cartItemContentSettingsQuantity.classList.add("cart__item__content__settings__quantity");
                cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
                //Settings_quantité-texte
                let textQuantity = document.createElement("p");
                textQuantity.textContent = " Qté :";
                cartItemContentSettingsQuantity.appendChild(textQuantity);
                //Settings_quantité-input
                let itemQuantity = document.createElement("input");
                itemQuantity.classList.add("itemQuantity");
                itemQuantity.setAttribute("type", "number");
                itemQuantity.setAttribute("name", "itemQuantity");
                itemQuantity.setAttribute("min", "1");
                itemQuantity.setAttribute("max", "100");
                itemQuantity.setAttribute("value", `${basket[article].quantity}`);
                cartItemContentSettingsQuantity.appendChild(itemQuantity);
                //Settings_delete
                let cartItemContentSettingsDelete = document.createElement("div");
                cartItemContentSettingsDelete.classList.add("cart__item__content__settings__delete");
                cartItemContentSettings.appendChild(cartItemContentSettingsDelete);
                //Settings_delete-item
                let deleteItem = document.createElement("p");
                deleteItem.classList.add("deleteItem");
                deleteItem.textContent = "Supprimer";
                cartItemContentSettingsDelete.appendChild(deleteItem);
                //----------------------Fin creation des éléments--------------------------//


                /*Fonction qui calcule le prix et la quantité totale*/
                function total() {
                    //Récupérer les éléments par id ou class 
                    let productQuantity = document.querySelectorAll(".itemQuantity");
                    let productPrice = document.querySelectorAll(".cart__item__content__description p:last-child");
                    let productTotalQuantity = document.getElementById("totalQuantity");
                    let productTotalPrice = document.getElementById("totalPrice");
                    //Initialiser les variables
                    let totalPrice = 0;
                    let totalQuantity = 0;
                    //Créer une boucle qui parcourt chaque quantité
                    for (let i = 0; i < productQuantity.length; i++) {
                        let quantity = Number(productQuantity[i].value);
                        let price = parseFloat(productPrice[i].textContent);
                        //console.log(productPrice[i].textContent);
                        totalQuantity += quantity;
                        totalPrice += price * quantity;
                    }
                    //Afficher le totalQuantity et le totalPrice
                    productTotalQuantity.textContent = totalQuantity;
                    productTotalPrice.textContent = totalPrice;
                }
                total();

                /*Fonction qui permet de modifier la quantité*/
                function modifQuantity() {
                    //On récupére l'input de la quantité à modifier
                    productQuantity = document.querySelectorAll(".itemQuantity");
                    productQuantity.forEach((item) => {
                        //Récupérer nos articles pour utiliser les dataset
                        //closest renvoie l'élément ancêtre le plus proche, donc article qui englobe l'input quantité
                        let cartArticle = item.closest("article");
                        // console.log(cartArticle);
                        //Récupèrer l'id et la couleur de l'article grâce au dataset
                        let idData = cartArticle.dataset.id;
                        let colorData = cartArticle.dataset.color;
                        //On déclare la variable qui va recevoir la nouvelle quantité
                        let newQuantity = "";
                        //On écoute l'input lorsque celui-ci change
                        item.addEventListener("change", (event) => {
                            newQuantity = event.target.value;
                            console.log(newQuantity);
                            //On crée une boucle pour trouver l'élément qui a été ciblé grâce à son id et sa couleur et effectuer la mise à jour de la quantité
                            for (let i = 0; i < basket.length; i++) {
                                if (basket[i].id == idData && basket[i].colors == colorData) {
                                    basket[i].quantity = newQuantity;
                                    console.log(newQuantity);
                                }
                            }
                            //Mise à jour du LocalStorage
                            localStorage.setItem("productAdded", JSON.stringify(basket));
                            // Mise à jour des totals en chargeant la page 
                            location.reload();
                        })
                    })
                }
                modifQuantity();

                /*Fonction qui permet de supprimer un produit */
                function deleteProduct() {
                    //On récupére les boutons supprimer
                    let deleteItem = document.querySelectorAll(".deleteItem");
                    //On crée une boucle sur les boutons supprimer
                    deleteItem.forEach((item) => {
                        //On écoute le clic sur le bouton supprimer ciblé
                        item.addEventListener("click", () => {
                            //closest renvoie l'élément ancêtre le plus proche, donc article qui englobe le bouton supprimer 
                            let cartArticle = item.closest("article");
                            // console.log(cartArticle);
                            //On récupére l'id et la couleur des articles grâce au dataset 
                            let idData = cartArticle.dataset.id;
                            console.log(idData);
                            let colorData = cartArticle.dataset.color;
                            //Avec la méthode filter on selectionne les élément à garder et on supprime l'élément où le bouton supprimer a été cliqué du tableau basket
                            basket = basket.filter((element) => element.id !== idData || element.colors !== colorData);
                            //Supprimer l'articles du DOM
                            cartArticle.remove();
                            //Mise à jour du localStorage
                            localStorage.setItem("productAdded", JSON.stringify(basket));
                            //Mise à jour des totals en chargeant la page 
                            location.reload();

                        });
                    });
                }
                deleteProduct();
            }
            articleDisplay();
        }
    }
}
basketElements();

/*--------------------------------Formulaire de commande--------------------------------*/

//Récupérer le formulaire
let form = document.querySelector(".cart__order__form");

//-------------------------------------Validation firstName------------------------------------
console.log(form.firstName); //Ceci affiche l'input firstName dans la console 
//Ecouter la modification de l'input firstName
form.firstName.addEventListener('change', function () {
    validFirstName(this); //this fait référence à l'input firstName donc ce que l'utilisateur est en train de saisir 
});

function validFirstName(inputFirstName) {
    //Création de l'expression régulière pour la validation du prénom
    let firstNameRegExp = new RegExp('^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$', 'g');
    //On teste l'expression régulière
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    console.log(testFirstName);// Affichage du résultat dans la console true ou false
    let messageError = inputFirstName.nextElementSibling;//Récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testFirstName) {//Si le testFirstName est vrai on affiche rien
        messageError.textContent = "";
        return true; //firstName valide la fonction validfirstName retourne vrai

    } else { //Sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer un prénom valide";
        return false;// firstName non valide la fonction validfirstName retourne false
    }
};

//-------------------------------------Validation lastName------------------------------------
console.log(form.lastName); //Ceci affiche l'input lastName dans la console 
//Ecouter la modification de l'input lastName
form.lastName.addEventListener('change', function () {
    validLastName(this); //this fait référence à l'input lastName donc ce que l'utilisateur est en train de saisir 
});

function validLastName(inputLastName) {
    //Création de l'expression régulière pour la validation du nom
    let lastNameRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //On teste l'expression régulière
    let testLastName = lastNameRegExp.test(inputLastName.value);
    console.log(testLastName);// Affichage du résultat dans la console true ou false
    let messageError = inputLastName.nextElementSibling;//Récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testLastName) {//Si le testLastName est vrai on affiche rien
        messageError.textContent = "";
        return true; //lastName valide la fonction validLastName retourne vrai

    } else { //Sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer un nom valide";
        return false;// lastName non valide la fonction validLastName retourne false
    }
};

//-------------------------------------Validation adresse------------------------------------
console.log(form.address); //Ceci affiche l'input address dans la console 
//Ecouter la modification de l'input address
form.address.addEventListener('change', function () {
    validAddress(this); //this fait référence à l'input address donc ce que l'utilisateur est en train de saisir 
});

function validAddress(inputAddress) {
    //Création de l'expression régulière pour la validation de l'adresse
    let addressRegExp = new RegExp("^[a-zA-Z0-9àâäéèêëïîôöùûüÿç,. '-]+$", "g");
    //On teste l'expression régulière
    let testAddress = addressRegExp.test(inputAddress.value);
    console.log(testAddress);// Affichage du résultat dans la console true ou false
    let messageError = inputAddress.nextElementSibling;//Récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testAddress) {//Si le testAddress est vrai on affiche rien
        messageError.textContent = "";
        return true; // adresse valide la fonction validAddress retourne vrai

    } else { //Sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer une adresse valide";
        return false;// adresse non valide la fonction validAddress retourne false
    }
};

//-------------------------------------Validation City------------------------------------
console.log(form.city); //Ceci affiche l'input city dans la console 
//Ecouter la modification de l'input city
form.city.addEventListener('change', function () {
    validCity(this); //this fait référence à l'input city donc ce que l'utilisateur est en train de saisir 
});

function validCity(inputCity) {
    //Création de l'expression régulière pour la validation de la ville
    let cityRegExp = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüÿç-]+$", "g");
    //On teste l'expression régulière
    let testCity = cityRegExp.test(inputCity.value);
    console.log(testCity);// Affichage du résultat dans la console true ou false
    let messageError = inputCity.nextElementSibling;//récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testCity) {//Si le testCity est vrai on affiche rien
        messageError.textContent = "";
        return true; //city valide la fonction validCity retourne vrai

    } else { //Sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer une ville valide";
        return false;// city non valide la fonction validCity retourne false
    }
};

//-------------------------------------Validation Email------------------------------------
console.log(form.email); //Ceci affiche l'input email dans la console 
//Ecouter la modification de l'input email
form.email.addEventListener('change', function () {
    validEmail(this); //this fait référence à l'input email donc ce que l'utilisateur est en train de saisir 
});

function validEmail(inputEmail) {
    //Création de l'expression régulière pour la validation de l'email
    let emailRegExp = new RegExp("^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$", "g");

    //On teste l'expression régulière
    let testEmail = emailRegExp.test(inputEmail.value);
    console.log(testEmail);// Affichage du résultat dans la console true ou false
    let messageError = inputEmail.nextElementSibling;//Récupérer la balise suivante qui est la balise p pour afficher le message d'erreur
    console.log(messageError);
    if (testEmail) {//Si le testEmail est vrai on affiche rien
        messageError.textContent = "";
        return true; //email valide la fonction validEmail retourne vrai

    } else { //Sinon on affiche le message d'erreur
        messageError.textContent = "Veuillez entrer un email valide";
        return false;// email non valide la fonction validEmail retourne false
    }
};
/*-------------------------------------Passer la commande--------------------------------------*/
//Déclarer les variables contact et products attendu par l'API afin que je reçois le numéro de commande
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
}
let products = [];
//Récupérer le bouton commander
let btnOrder = document.getElementById('order');
console.log(btnOrder);
/*Fonction qui traite l'envoie de la requete et la récupération du numéro de commande*/
function order() {
    //Ecouter le bouton commander
    btnOrder.addEventListener("click", function (e) {
        e.preventDefault(); //Empêcher le comportement par defaut de notre bouton
        if (validFirstName(form.firstName) && validLastName(form.lastName) && validAddress(form.address) && validCity(form.city) && validEmail(form.email) && basket != null && basket != 0) {//-(1)-Si form valide et le panier n'est pas vide on passe commande et on envoie une requete post pour reçevoir le orderId
            contact = {
                firstName: firstName.value,
                lastName: lastName.value,
                address: address.value,
                city: city.value,
                email: email.value
            }
            //console.log(contact);//ceci affiche le contacte avec ses informations sur la console
            //Envoyer contact au localStorage
            localStorage.setItem("contact", JSON.stringify(contact));
            //Récupérer l'id des produits pour la requete post ,l'Api étant dans sa version initiale elle ne prend pas en considération la quantité ni la couleur 
            for (let i = 0; i < basket.length; i++) {//Parcourir mon panier et envoyer les id dans products
                products.push(basket[i].id);
            }
            // console.log(products)//Ceci affiche les id des produits
            //Déclaration et initialisation de l'objet à envoyer à l'API
            let orderApi = {
                contact,
                products,
            }
            console.log(orderApi);//Ceci affiche l'objet à envoyer à l'API
            //Envoyer une requete post utilisant la fetch()
            fetch("http://localhost:3000/api/products/order", {
                //Ajouter une méthode
                method: "POST",
                //Ajouter headers
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                //Ajouter un body avec les informations à envoyer en format JSON
                body: JSON.stringify(orderApi), //orderApi qui contient contact et produits
            }).then(function (res) {//Appeler la fonction then pour récupérer la réponse de la requete 
                if (res.ok) {
                    return res.json()
                }
            }).then(function (data) {//Récuperer la réponse puis l'afficher dans la console
                console.log(data)
                //Récupération orderId pour l'afficher dans la page confirmation dans la variable orderConfirmation
                let orderConfirmation = data.orderId;
                console.log(orderConfirmation);//Ceci affiche le numéro de commande
                //Aller sur la page confirmation 
                document.location.href = `confirmation.html?id_commande=${orderConfirmation}`;
            }).catch(function (err) {//Attraper les erreurs
                console.log(err)
            })

        } else {//-(2)-Sinon on affiche une alerte
            alert("Merci de bien renseigner le formulaire et/ou ajouter un produit à votre panier");
        }
    });
}
order();




