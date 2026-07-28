
/*================ COMPTE À REBOURS ================*/
//  calcule le temps restant jusqu'au 20 novembre 2026 08:00
const dateConference = new Date("November 20, 2026 08:00:00").getTime();
//   setInterval=lance la fonction toutes les 1000ms=1 seconde
const compteur = setInterval(function () {

    const maintenant = new Date().getTime();

    const difference = dateConference - maintenant;//   difference en milisecondes
    //   conversion ms -> jours,heures,minutes,secondes 
    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((difference % (1000 * 60)) / 1000);
//    met a jours le HTML 
    document.getElementById("days").textContent = jours;
    document.getElementById("hours").textContent = heures;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = secondes;
    // si la date est passee :on arrete le compteur et on  met 00 
    if (difference < 0) {

        // clearInterval(compteur); important :arrete la boucle 

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

    }

}, 1000);
/*================ MODE SOMBRE ================*/
//   gere le bouton dark/light + sauvegarde dans le navigateur
const themeButton = document.getElementById("theme-toggle");

if (themeButton) {
//   au changement :si l'utisateur avait mis dark, on le remet
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
//   au clic :on ajoute/enleve la classe dark mode 
    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");
//    sauvegarde le choix dans localStorage pour le garder apres refresh
        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

}
/*================ COMPTEURS ANIMÉS ================*/
//   anime les chiffres quand on scroll dessus.Ex:0->150
const compteurs = document.querySelectorAll(".counter");
//  IntersectionObserver = detecte quand un element entre a l'ecran
const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

          if(entry.isIntersecting){  //  si l'element est visible

            const compteur = entry.target;
            const objectif = Number(compteur.dataset.target); // li data-target="150"
            let valeur = 0;

            const animation = setInterval(function(){

                valeur++;

                compteur.textContent = valeur;

                if(valeur >= objectif){

                    compteur.textContent = objectif;
                    clearInterval(animation); // stop quand on atteint l'objectif

                }

            },20);  //  20ms entre chaque +1= effet fluide

            observer.unobserve(compteur);  // on ne relance pas l'animation 2 fois

        }

    });

});

compteurs.forEach(function(compteur){

    observer.observe(compteur);  // on observe chaque compteur

});
/*================ ONGLETS PROGRAMME ================*/
    // systeme d'onglets jour1,2,3
const boutons = document.querySelectorAll(".tab-btn");
const contenus = document.querySelectorAll(".tab-content");

boutons.forEach(function(bouton){

    bouton.addEventListener("click", function(){
        // 1.enleve active sur tous les boutons et contenus 
        boutons.forEach(function(btn){
            btn.classList.remove("active");
        });

        contenus.forEach(function(contenu){
            contenu.classList.remove("active");
        });
        //    2. ajoute active sur le bouton clique
        bouton.classList.add("active");
            // 3.affiche le contenus qui a le meme id que data-day du bouton 
        const jour = bouton.getAttribute("data-day"); // ex :"jour 1"

        document.getElementById(jour).classList.add("active");

    });

});
// ===================== FILTRE INTERVENANTS =====================
//  filtre les cartes par categorie 
const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const cartes = document.querySelectorAll(".carte-intervenant");

boutonsFiltre.forEach(function(bouton){

    bouton.addEventListener("click", function(){

        boutonsFiltre.forEach(function(btn){
            btn.classList.remove("active");
        });

        bouton.classList.add("active");

        const filtre = bouton.dataset.filtre;//  ex : "all" ou "speaker"

        cartes.forEach(function(carte){
                // affiche si "all" ou si la categorie correspond
            if(filtre === "all" || carte.dataset.categorie === filtre){

                carte.style.display = "block";

            }else{

                carte.style.display = "none";

            }

        });

    });

});
/*================ VALIDATION FORMULAIRE ================*/
const form = document.getElementById("contactForm");

if(form){
  form.addEventListener("submit", function(e){
    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();
    const message = document.getElementById("message").value.trim();

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;   // regex pour verifier email 
    const telephoneClean = telephone.replace(/\D/g, ""); // enleve tout ce qui n'est pas chiffre

    if(nom===""){
      alert("Veuillez saisir votre nom.");
      e.preventDefault();//   empeche l'envoi du formulaire
      return;
    }

    if(!emailRegex.test(email)){
      alert("Adresse email invalide.");
      e.preventDefault();
      return;
    }

    if(telephoneClean.length<8){
      alert("Le numéro doit contenir au moins 8 chiffres.");
      e.preventDefault();
      return;
    }

    if(message.length<20){
      alert("Le message doit contenir au moins 20 caractères.");
      e.preventDefault();
      return;
    }
    
    alert("Formulaire envoyé avec succès !"); // test
  });
}
/*================ RETOUR EN HAUT ================*/

const topBtn = document.getElementById("topBtn");
    // affiche le bouton quand on scroll de plus de 300px 
window.addEventListener("scroll",function(){

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});
//  scroll fluide vers le haut au clic 
topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,
behavior:"smooth" // effet smooth

});

});
/*================ ANNÉE DYNAMIQUE ================*/
// met l'annee actuelle dans le footer automatiquement
const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}
/*================ NAVBAR AU SCROLL ================*/
//  ajoute un ombre a la navbar quand on scroll 
const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",function(){

if(window.scrollY>80){

navbar.style.boxShadow="0 5px 15px rgba(0,0,0,.2)";

}else{

navbar.style.boxShadow="none";

}

});
/*================ MENU HAMBURGER ================*/
// ouvre/ferme le menu mobile
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-link");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active"); 
  // toggle = ajoute/enleve la classe

    });

}