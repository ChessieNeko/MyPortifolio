//let infoProject = document.querySelector("project-info");

const cardsProject = document.querySelectorAll(".project-card");

function closeAllCardsExcept(tagCard){
    cardsProject.forEach((card) => {
        if(card != tagCard){
            //console.log("remove? ", tagCard);
            card.classList.remove("-opened");
        }
    });
}


const toggleOpenCard = (e) =>{
    infoCard = e.currentTarget.querySelector(".project-info");
    closeAllCardsExcept(e.currentTarget);

    e.currentTarget.classList.add("-opened");
};

cardsProject.forEach((card) => {
    card.addEventListener("click", toggleOpenCard);
});


const btnCloseCard = document.querySelectorAll(".btn-close-card");

function closeCard(e){
    e.stopPropagation(); // Evita a propagação do evento para o card
    let cardProject = e.currentTarget.closest('.project-card')
    cardProject.classList.remove("-opened");
}
btnCloseCard.forEach((btn) => {    
    btn.addEventListener("click", closeCard);
});

