const titulo = document.createElement("h1");
titulo.textContent = "Viva o JavaScript";

const body = document.querySelector("body");
body.append(titulo);

// Variables

const nodeInputNumero = document.querySelector("el");
const nodeInputSubmit = document.querySelector("input#colecao");
const nodeUlColecao = document.querySelector("ul");

const colecao = [];


// Functions

function guardarCarta()
{
colecao.push(nodeInputNumero.value);
colecao.sort();
}

atualizaLista(colecao, nodeUlColecao)
{
nodeUlColecao.splice(0,nodeUlColecao.lenght);

    for(colectIION of nodeUlColecao)
    {
        colectIION = colecao;
    }
}
