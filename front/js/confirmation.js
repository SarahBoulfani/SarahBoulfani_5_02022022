/*Fonction qui permet de récupérer le numéro de commande*/
function confirmation() {
    //Récupérer contact du localStorage
    let contact = JSON.parse(localStorage.getItem("contact"));
    //console.log(contact);
    //Récupération du firstName value pour l'afficher dans le message de la commande 
    let name = contact.firstName;
    //Ciblé l'élément par son id pour afficher le numéro de commande
    let confirmation = document.getElementById("orderId");
    //On récupère le numéro de commande depuis l'Url avec URLSearchParams
    let params = new URLSearchParams(document.location.search);
    //Récupérer le id_commande donc le numéro de commande
    let confirmationId = params.get("id_commande");
    console.log(confirmationId);
    confirmation.innerText = `${confirmationId}.          
    ${name}, nous vous remercions de votre visite et avons le plaisir de vous confirmer votre commande.`;
    //Supprimer le localStorage
    localStorage.clear();
}
confirmation();