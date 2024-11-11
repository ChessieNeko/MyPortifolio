/*
document.addEventListener("DOMContentLoaded", function() {
    const svgContainer = document.querySelector('.svg-container');

    fetch('assets/images/num%20sei/teste2.svg') // Caminho para o arquivo SVG
    .then(response => response.text())
    .then(svgCode => {
        svgContainer.innerHTML = svgCode;
    })
    .catch(error => console.error('Erro ao carregar o SVG:', error));
});


document.addEventListener("DOMContentLoaded", function () {
    const svgImage = document.getElementById("svgBannerImage");

    svgImage.addEventListener("load", function () {
        const svgFile = svgImage.contentDocument; // Acessa o documento SVG
        const lightLuminaria = svgFile.getElementById("lightLuminaria");
        const luminaria = svgFile.getElementById("luminaria");

        if (luminaria && lightLuminaria) {
            luminaria.style.cursor = "pointer";
            luminaria.addEventListener("click", function () {
                // Alterna a propriedade opacity entre 0 e 1
                if (lightLuminaria.style.opacity === "0") {
                    lightLuminaria.style.opacity = "0.45"; // Torna visível
                } else {
                    lightLuminaria.style.opacity = "0"; // Torna transparente
                }
            });
        }
    });
});
*/
document.addEventListener("DOMContentLoaded", function() {
    const svgContainer = document.querySelector('.svg-container');

    fetch('assets/images/num%20sei/teste2.svg') // Caminho para o arquivo SVG
    .then(response => response.text())
    .then(svgCode => {
        svgContainer.innerHTML = svgCode;

        // Agora o SVG foi carregado e inserido, podemos manipular seus elementos
        const svgImage = svgContainer.querySelector('svg'); // Acessa o SVG carregado

        svgImage.addEventListener("load", function () {
            const svgFile = svgImage; // Já temos o SVG, não precisa usar contentDocument
            const lightLuminaria = svgFile.getElementById("lightLuminaria");
            const luminaria = svgFile.getElementById("luminaria");

            if (luminaria && lightLuminaria) {
                luminaria.style.cursor = "pointer";
                luminaria.addEventListener("click", function () {
                    // Alterna a propriedade opacity entre 0 e 1
                    if (lightLuminaria.style.opacity === "0") {
                        lightLuminaria.style.opacity = "0.45"; // Torna visível
                    } else {
                        lightLuminaria.style.opacity = "0"; // Torna transparente
                    }
                });
            }
        });
    })
    .catch(error => console.error('Erro ao carregar o SVG:', error));
});
