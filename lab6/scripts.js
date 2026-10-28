const titulo = document.createElement("h1");
titulo.textContent = "Viva o JavaScript";

const body = document.querySelector("body");
body.append(titulo);

// Variables

const nodeInputNumero = document.querySelector("el");
const nodeInputSubmit = document.querySelector("input#colecao");
const nodeUlColecao = document.querySelector("ul");

const colecao = [];

const numeros = document.querySelector("h3");
let total = 0;
// Functions

function guardarCarta()
{
colecao.push(nodeInputNumero.value);
colecao.sort();
total++;
numeros.textContent += total;
}

atualizaLista(colecao, nodeUlColecao)
{
nodeUlColecao.splice(0,nodeUlColecao.lenght);

    for(colectIION of nodeUlColecao)
    {
        colectIION = colecao;
    }
}
