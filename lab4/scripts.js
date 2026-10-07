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

b1.onclick = function() {cores1("red");}
b2.onclick = function() {cores1("green");}
b3.onclick = function() {cores1("blue");}

// 3.
const inputTexto = document.querySelector("#input-texto");

inputTexto.addEventListener("input", function() {

    const cores = ["salmon", "lightblue", "lightgreen", "yellow", "pink"];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];
    inputTexto.style.backgroundColor = corAleatoria;
});

//4.
const inputCor = document.querySelector("#input-cor");
const btnCor = document.querySelector("#btn-cor");

btnCor.addEventListener("click", function() {
    const corEscolhida = inputCor.value;
    document.body.style.backgroundColor = corEscolhida;
});

// 5.
const textoContador = document.querySelector("#contador-texto");
const btnContar = document.querySelector("#btn-contar");

// Vai buscar o número inicial que está no HTML (neste caso, 1)
let contador = parseInt(textoContador.textContent);

btnContar.addEventListener("click", function() {
    contador++;
    textoContador.textContent = contador;
});
