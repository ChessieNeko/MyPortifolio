document.addEventListener("DOMContentLoaded", function() {
    sliderBtn = document.querySelector(".slider");
console.log("o btn aqui: ",sliderBtn)
    //Mudança de tema
    const btnSwitchTheme = document.getElementById("chk-switchTheme");
    let lightIs = false;
    
    btnSwitchTheme.addEventListener('click', function(event){        
        updateLightEffect();
        
        if(btnSwitchTheme.checked){
            console.log("Escuro");
        }else{
            console.log("Claro");
        }
    });

    function updateLightEffect(){ 
        
        applyTheme(); 
        console.log(btnSwitchTheme.checked);
        if(btnSwitchTheme.checked){
            console.log("Modo Escuro ativado");
            lightLuminaria.style.opacity = "0.45";

            sliderBtn.querySelector('.bi').classList.remove('bi-brightness-high-fill');
            sliderBtn.querySelector('.bi').classList.add('bi-moon-fill');
        }else{
            console.log("Modo Claro ativado");
            lightLuminaria.style.opacity = "0";
            sliderBtn.querySelector('.bi').classList.remove('bi-moon-fill');
            sliderBtn.querySelector('.bi').classList.add('bi-brightness-high-fill');
        }
    }


    /////////////////////////
    const body = document.body;
    function applyTheme() {
        if (btnSwitchTheme.checked) {
            body.classList.add("darkTheme");
            body.classList.remove("lightTheme");
            console.log("darkTheme");
        } else {
            body.classList.add("lightTheme");
            body.classList.remove("darkTheme");
            console.log("lightTheme");
        }
    }

    // Aplicar o tema ao carregar a página
    applyTheme();
    /////////////////////////


    //Manipulando o SVG da Luminaria
    const svgContainer = document.querySelector('.svg-container');
    
    fetch('assets/images/num%20sei/teste2.svg')
    .then(response => response.text())
    .then(svgCode => {
        svgContainer.innerHTML = svgCode;

        // Agora o SVG foi carregado e inserido, podemos manipular seus elementos
        const svgImage = svgContainer.querySelector('svg');
        if (svgImage) {
            /////console.log("SVG carregado");
            const lightLuminaria = svgImage.getElementById("lightLuminaria");
            const luminaria = svgImage.getElementById("luminaria");

            if (luminaria && lightLuminaria) {
                /////console.log("Elementos encontrados");
                luminaria.style.cursor = "pointer";
                
                luminaria.addEventListener("click", function () {
                    btnSwitchTheme.checked = !btnSwitchTheme.checked;
                    updateLightEffect();
                });
            } else {
                console.error("Elementos SVG não encontrados");
            }
        }
    })
    .catch(error => console.error('Erro ao carregar o SVG:', error));
});
