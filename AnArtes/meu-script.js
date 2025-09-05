//CARROSSEL DE IMG BANNER
const imgs = document.querySelectorAll(".item-carrossel img");
console.log(imgs)
let currentImg = 0;
let intervalId = null; // Variável para armazenar o intervalo

// Adicione crossorigin para evitar problemas de taint
imgs.forEach(img => {
    img.crossOrigin = "anonymous";
});

const showImage = () => {
    imgs.forEach((img, index) => {
        img.style.display = index === currentImg ? "block" : "none";
        img.parentNode.querySelector("p").style.display = index === currentImg ? "block" : "none";
    });

    updateBannerColor();
};

const startAutoplay = () => {
    intervalId = setInterval(() => {
        currentImg++;
        if (currentImg >= imgs.length) {
        currentImg = 0;
        }
        showImage();
    }, 10000); // Alterar 3000 para o tempo desejado em milissegundos (3 segundos)
    updateBannerColor();
};

const stopAutoplay = () => {
    clearInterval(intervalId);
    intervalId = null;
};

// Iniciar o carrossel automaticamente
startAutoplay();

// Adicionar eventos de clique nos botões
document.querySelector(".banner-btn.-prev").addEventListener("click", () => {
    stopAutoplay(); // Parar o carrossel automático ao clicar no botão anterior
    currentImg--;
    if (currentImg < 0) {
        currentImg = imgs.length - 1;
    }
    showImage();
    startAutoplay(); // Reiniciar o carrossel automático após a troca manual
});

document.querySelector(".banner-btn.-next").addEventListener("click", () => {
    stopAutoplay(); // Parar o carrossel automático ao clicar no botão próximo
    currentImg++;
    if (currentImg >= imgs.length) {
        currentImg = 0;
    }
    showImage();
    startAutoplay(); // Reiniciar o carrossel automático após a troca manual
});


// Cor do background com ThiefColor
// Função para atualizar a cor de fundo do contêiner de texto com base na cor predominante da imagem atualmente exibida no carrossel

// Função para atualizar a cor de fundo do banner com base na imagem atualmente exibida
function updateBannerColor() {
    const colorThief = new ColorThief();
    const img = imgs[currentImg];
    const banner = document.getElementById("banner");

    if (img.complete) {
        setBannerColor(colorThief, img, banner);
    } else {
        img.addEventListener("load", () => {
            setBannerColor(colorThief, img, banner);
        });
    }
}

// Função para definir a cor de fundo do banner com base na cor predominante da imagem
function setBannerColor(colorThief, img, banner) {
    const color = colorThief.getColor(img);
    const rgbColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    
    //isso coloca o desfoque no fim do banner
    //const gradientColor = `linear-gradient(to left, rgba(255, 255, 255, 0), ${rgbColor} 30%)`;
    banner.style.background = rgbColor;
}

/**Fixa o SubMenu no topo ao rolar a tela**/
window.addEventListener('scroll', function() {
    var menuSub = document.querySelector('.menu-sub');
    var menuTop = document.querySelector('.menu-top');
    var menuSubOriginalPosition = menuTop.offsetHeight; // Altura do menu-top

    if (window.scrollY > menuSubOriginalPosition) {
        menuSub.classList.add('menu-sub-fixo');
    } else {
        menuSub.classList.remove('menu-sub-fixo');
    }
});

