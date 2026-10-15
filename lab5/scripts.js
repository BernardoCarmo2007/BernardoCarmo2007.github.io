const p1 = document.querySelector("p#um");

const p2 = document.querySelector("p#p2");
const b1 = document.querySelector("button#b1");
const b2 = document.querySelector("button#b2");
const b3 = document.querySelector("button#b3");

function mudarTexto()
{
    if(p1.textContent === "1- Passa por aqui")
    {
    p1.textContent = "Obrigado por passares!";
    }
    else{
        p1.textContent = "1- Passa por aqui";
    }
}

p1.addEventListener("mouseover", mudarTexto);
p1.addEventListener("mouseout", mudarTexto);

function cores1(valor)
{
p2.style.color = valor;
}

b1.onclick = function() {cores1("yellow");}
b2.onclick = function() {cores1("orange");}
b3.onclick = function() {cores1("blue");}

// 3
const inputTexto = document.querySelector("#input-texto");

inputTexto.addEventListener("input", function() {

    const cores = ["salmon", "lightblue", "lightgreen", "yellow", "pink"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    inputTexto.style.backgroundColor = corAleatoria;
});

//4
const inputCor = document.querySelector("#input-cor");
const btnCor = document.querySelector("#btn-cor");

btnCor.addEventListener("click", function() {
    const corEscolhida = inputCor.value;
    document.body.style.backgroundColor = corEscolhida;
});

// 5
const textoContador = document.querySelector("#contador-texto");
const btnContar = document.querySelector("#btn-contar");

let contador = 0;
btnContar.addEventListener("click", function() {
    contador++;
    textoContador.textContent = contador;
});

// 6

const i1 = document.querySelector("input#i1");
const i2 = document.querySelector("input#i2");
const b6 = document.querySelector("button#b6");
const p6 = document.querySelector("p#p6");

b6.addEventListener("click", function ()
{
    e.preventDefault();
p6.textContent = "Olá, o " + i1.textContent + " tem " + i2.textContent + "!";

});

// 7-

let counter = 0;
const p7 = document.querySelector("p#p7");

function correr_tempo()
{
    counter++;
    p7.textContent = counter;
}
setInterval(correr_tempo, 1000);
