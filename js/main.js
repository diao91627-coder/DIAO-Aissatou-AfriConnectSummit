
/*================ COMPTE À REBOURS ================*/

const dateConference = new Date("November 20, 2026 08:00:00").getTime();

const compteur = setInterval(function () {

    const maintenant = new Date().getTime();

    const difference = dateConference - maintenant;

    const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
    const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const secondes = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = jours;
    document.getElementById("hours").textContent = heures;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = secondes;

    if (difference < 0) {

        clearInterval(compteur);

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

    }

}, 1000);
/*================ MODE SOMBRE ================*/

const themeButton = document.getElementById("theme-toggle");

if (themeButton) {

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }

    });

}
/*================ COMPTEURS ANIMÉS ================*/

const compteurs = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(function(entries){

    entries.forEach(function(entry){

        if(entry.isIntersecting){

            const compteur = entry.target;
            const objectif = Number(compteur.dataset.target);

            let valeur = 0;

            const animation = setInterval(function(){

                valeur++;

                compteur.textContent = valeur;

                if(valeur >= objectif){

                    compteur.textContent = objectif;
                    clearInterval(animation);

                }

            },20);

            observer.unobserve(compteur);

        }

    });

});

compteurs.forEach(function(compteur){

    observer.observe(compteur);

});
/*================ ONGLETS PROGRAMME ================*/

const boutons = document.querySelectorAll(".tab-btn");
const contenus = document.querySelectorAll(".tab-content");

boutons.forEach(function(bouton){

    bouton.addEventListener("click", function(){

        boutons.forEach(function(btn){
            btn.classList.remove("active");
        });

        contenus.forEach(function(contenu){
            contenu.classList.remove("active");
        });

        bouton.classList.add("active");

        const jour = bouton.getAttribute("data-day");

        document.getElementById(jour).classList.add("active");

    });

});
const boutonsFiltre = document.querySelectorAll(".btn-filtre");
const cartes = document.querySelectorAll(".carte-intervenant");

boutonsFiltre.forEach(function(bouton){

    bouton.addEventListener("click", function(){

        boutonsFiltre.forEach(function(btn){
            btn.classList.remove("active");
        });

        bouton.classList.add("active");

        const filtre = bouton.dataset.filtre;

        cartes.forEach(function(carte){

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

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telephoneClean = telephone.replace(/\D/g, "");

    if(nom===""){
      alert("Veuillez saisir votre nom.");
      e.preventDefault();
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

window.addEventListener("scroll",function(){

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});

topBtn.addEventListener("click",function(){

window.scrollTo({

top:0,
behavior:"smooth"

});

});
/*================ ANNÉE DYNAMIQUE ================*/

const year=document.getElementById("year");

if(year){

year.textContent=new Date().getFullYear();

}
/*================ NAVBAR AU SCROLL ================*/

const navbar=document.querySelector(".navbar");

window.addEventListener("scroll",function(){

if(window.scrollY>80){

navbar.style.boxShadow="0 5px 15px rgba(0,0,0,.2)";

}else{

navbar.style.boxShadow="none";

}

});
/*================ MENU HAMBURGER ================*/

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-link");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

    });

}