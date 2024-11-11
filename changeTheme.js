
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