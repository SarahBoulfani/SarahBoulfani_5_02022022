/*Fonction qui permet de récupérer le numéro de commande*/
function confirmation() {
    //Récupération de la balise pour afficher le numéro de commande
    let confirmationOrder = document.getElementById("orderId");
    //Récupérer contact du localStorage
    let contact = JSON.parse(localStorage.getItem("contact"));
    //console.log(contact);
    //Récupération du firstName value pour l'afficher dans le message de la commande 
    let name = contact.firstName;
    //Récupérer le orderId donc le numéro de commande du localStorage
    let orderId = localStorage.getItem("orderId");
    //console.log(orderId); 
    //Puis l'afficher
    confirmationOrder.innerText = `${orderId}.          
    ${name}, nous vous remercions pour votre commande.`;
    //Supprimer le localStorage
    localStorage.clear();
}
confirmation();

/* //deuxiéme methode
//Récupérer contact du localStorage
let contact = JSON.parse(localStorage.getItem("contact"));
//console.log(contact);
//Récupération du firstName value pour l'afficher dans le message de la commande 
let name = contact.firstName;
let confirmation = document.getElementById("orderId");
let params = new URLSearchParams(document.location.search);
let confirmationId = params.get("id_commande");
console.log(confirmationId);
confirmation.innerText = `${confirmationId}.          
${name}, nous vous remercions pour votre commande.`;
localStorage.clear(); */