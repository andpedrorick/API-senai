// Aprender a chamar uma url pelo JavaScript
// 1* Chamar API
// 2* "Traduzir" a resposta da API 
// 3* Tralhar com os dados da API


// AJAX = ANTIGA E NÃO DEVE SER USADA EM CODIGO NOVOS
// FETCH = 2015+
// AXIOS = mais moderno, pórem depende de uma biblioteca externa 
let respostaApi;
let dadosApi;
const cep = document.querySelector("#cep")
const rua = document.querySelector("#rua")
const estado = document.querySelector("#uf")
const bairro = document.querySelector("#bairro")
const cidade = document.querySelector("#cidade")
const rodopiao = document.querySelector(".loader")




const todoForm = [cep, rua, estado, bairro, cidade]





// Métodos do fetch para ler os dados da API
function buscaCep(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((resposta) => {
            console.log(resposta)
            rodopiao.style.display = "block"
            desabilitarForms()
            // Decodificando a resposta que vem no formato json
            return resposta.json()

        }).then((dados => {

            dadosApi = dados;

            setTimeout(() => {
                preencherForms(dadosApi)
                habilitarForms()
                rodopiao.style.display = "none"
            }, 5000)
                ;

        }));
}




function preencherForms(dadosApi) {
    rua.value = dadosApi.logradouro;
    estado.value = dadosApi.uf;
    cidade.value = dadosApi.localidade;
    bairro.value = dadosApi.bairro
}

function desabilitarForms() {
    for (const input of todoForm) {
        input.disabled = true;
    }

}

function habilitarForms() {
    for (const input of todoForm) {
        input.disabled = false;
    }

}

cep.addEventListener("keydown", (e) => {
    console.log(e)
    if (e.key === "Enter") {
        alert("Vamos buscar o cep...")

        buscaCep(cep.value)
    }
})
