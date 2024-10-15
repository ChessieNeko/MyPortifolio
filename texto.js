//let infoProject = document.querySelector("project-info");

const cardsProject = document.querySelectorAll(".project-card");


const toggleHideInfo = (e) =>{
    console.log(e.currentTarget)
    infoCard = e.currentTarget.querySelector(".project-info");
    console.log(infoCard);
    e.currentTarget.classList.toggle("-opened");
};

cardsProject.forEach((card) => {
    console.log(card);
    card.addEventListener("click", toggleHideInfo);
});
