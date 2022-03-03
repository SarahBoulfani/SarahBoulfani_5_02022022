function confirmation() {
    //récupération de la balise pour afficher le numéro de commande
    let confirmationOrder = document.getElementById("orderId");
    //récupérer contact du localStorage
    let contact = JSON.parse(localStorage.getItem("contact"));
    //console.log(contact);
    //récupération du firstName value pour l'afficher dans le message de la commande 
    let name = contact.firstName;
    //récupérer le orderId donc le numéro de commande du localStorage
    let orderId = localStorage.getItem("orderId");
    //console.log(orderId); 
    //l'afficher
    confirmationOrder.innerText = `${orderId}.          
    ${name}, nous vous remercions pour votre commande.`;
    //supprimer le localStorage
    localStorage.clear();
}
confirmation();
//deuxiéme methode
/* let confirmation = document.getElementById("orderId");
let params = new URLSearchParams(document.location.search);
let confirmationId = params.get("id");
console.log(confirmationId); 
confirmation.textContent = confirmationId; */