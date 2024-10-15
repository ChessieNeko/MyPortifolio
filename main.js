let startX = 0, startY = 0;
let offsetX = 0, offsetY = 0;
let currentCard = null;
let zIndex = 100;
const initialPositions = [];
const $skillArea = document.getElementById("my-skills")
const cardSkill = document.querySelectorAll(".card-skill");
let infoSkillArea = $skillArea.getBoundingClientRect();
let lastAction;
let safeX;
let safeY;

cardSkill.forEach((card, index) => {
    initialPositions[index] = { top: card.offsetTop, left: card.offsetLeft };
    card.addEventListener("mousedown", mouseDown);
});

function mouseDown(e) {
    e.preventDefault();
    
    currentCard = e.currentTarget;
    
    // Coordenadas iniciais do mouse quando clicamos no card
    startX = e.clientX;
    startY = e.clientY;

    // Pega as coordenadas atuais de transformação do card se ele já tiver sido movido
    const transformValues = getComputedStyle(currentCard).transform;
    if (transformValues !== 'none') {
        const matrix = new DOMMatrix(transformValues);
        offsetX = matrix.m41; // TranslateX
        offsetY = matrix.m42; // TranslateY
    } else {
        offsetX = 0;
        offsetY = 0;
    }

    // Adiciona eventos de movimento e liberação ao documento
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseup", mouseUp);

    currentCard.style.transition = 'none'; // Remove a transição para um arraste mais suave
    currentCard.style.zIndex = zIndex++;
}

function mouseMove(e) {
    const movimentoX = e.clientX - startX + offsetX;
    const movimentoY = e.clientY - startY + offsetY;
    

    // Obter a posição do card em relação à janela de visualização
    const cardPosition = currentCard.getBoundingClientRect();
    const containerRect = $skillArea.getBoundingClientRect();

    // Canto superior esquerdo do card em relação ao container
    const pointACardX = cardPosition.left - containerRect.left; // Posição X do card em relação ao container
    const pointACardY = cardPosition.top - containerRect.top; // Posição Y do card em relação ao container

    const pointBCardX = pointACardX + currentCard.offsetWidth; // Canto inferior direito X
    const pointBCardY = pointACardY + currentCard.offsetHeight; // Canto inferior direito Y

    console.log("cardPosition.left: " + cardPosition.left);

    // Verificações de limites
    if (pointBCardX > $skillArea.offsetLeft + $skillArea.offsetWidth) {
        console.log("passou direita");
        lastAction = "direita";
    }
    else
    if (pointBCardY > $skillArea.offsetHeight) {
        console.log("passou Inferior");
        lastAction = "inferior";
    }
    else
    // Verifica se o card ultrapassa o limite superior e esquerdo
    if (pointACardX < 0) {
        console.log("passou esquerda");
        lastAction = "esquerda";
    }
    else
    if ( pointACardY < 0) {
        console.log("passou topo");
        lastAction = "topo";
    }
    else
    {
        movimentoX = Math.Clamp(movimentoX, 0, screenWidth);
        currentCard.style.transform = `translate(${movimentoX}px, ${movimentoY}px)`;
        lastAction = "";
        safeX = movimentoX;
        safeY = movimentoY;

        console.log("Safe: " + safeX + ", " + safeY);
    }

    if(cardPosition.left < 0)
    {
        console.log("ZYKA: " + cardPosition.left);
    }
}

function mouseUp(e) {
    // Remove os eventos de movimento e liberação quando soltar o mouse
    document.removeEventListener("mousemove", mouseMove);
    document.removeEventListener("mouseup", mouseUp);

    currentCard.style.transition = ''; // Restaura a transição, se necessário

    const movimentoX = e.clientX - startX + offsetX;
    const movimentoY = e.clientY - startY + offsetY;
    let infoCard = currentCard.getBoundingClientRect();
    let containerInfo = $skillArea.getBoundingClientRect();

    // Canto superior esquerdo do card em relação ao container
    const pointACardX = infoCard.left - containerInfo.left; // Posição X do card em relação ao container
    const pointACardY = infoCard.top - containerInfo.top; // Posição Y do card em relação ao container

    const offset = infoCard.left - 1;

    switch(lastAction)
    {
        case "esquerda":
        {
            console.log("Esquerdinha top: " + safeX + ", " + safeY + " Info x: " + infoCard.left);

            currentCard.style.transform = `translate(${safeX - offset}px, ${safeY}px)`;
            break;
        }
        case "direita":
        {
            console.log("Direitinha top: " + safeX + ", " + safeY);

            currentCard.style.transform = `translate(${safeX + infoCard.left}px, ${safeY}px)`;
            break;
        }
        case "topo":
        {
            console.log("Topo top: " + safeX + ", " + safeY);

            currentCard.style.transform = `translate(${safeX}px, ${safeY + offset}px)`;
            break;
        }
        case "inferior":
        {
            console.log("Inferior top: " + safeX + ", " + safeY);

            currentCard.style.transform = `translate(${safeX}px, ${safeY - offset}px)`;
            break;
        }
    }
}


// Função para resetar a posição dos cards ao clicar no botão de reset
document.getElementById('reset-button').addEventListener('click', () => {
    cardSkill.forEach((card, index) => {
        card.style.transform = 'none'; // Remove qualquer transformação aplicada
        card.style.top = initialPositions[index].top + 'px';
        card.style.left = initialPositions[index].left + 'px';
    });
});

// Função para resetar a posição dos cards
function resetCardsPosition() {
    const cards = document.querySelectorAll('.card'); // Selecione todos os cards
    cards.forEach(card => {
        card.style.transform = 'translate(0, 0)'; // Reseta a posição para (0, 0)
    });
}
