
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

let todosOsProdutos = [];
const produtosContainer = document.getElementById('produtos');
const cestoContainer = document.getElementById('cesto');

let precoTotalElement = document.getElementById('preco-total');
if (!precoTotalElement) {
    precoTotalElement = document.createElement('h3');
    precoTotalElement.id = 'preco-total';
    cestoContainer.after(precoTotalElement);
}

function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto');

    const img = document.createElement('img');
    img.src =  produto.image;
    img.alt = produto.title;

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('h4');
    preco.textContent = `Preço: ${Number(produto.price).toFixed(2)} €`;

    const btnAdicionar = document.createElement('button');
    btnAdicionar.textContent = '+ Adicionar ao cesto';

    btnAdicionar.addEventListener('click', () => {
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
        cestoAtual.push(produto);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
        atualizaCesto();
    });

    article.append(img, titulo, preco, btnAdicionar);
    return article;
}

function criaProdutoCesto(produto, indexDaLista) {
    const article = document.createElement('article');
    article.classList.add('produto-cesto');

    const titulo = document.createElement('span');
    titulo.textContent = produto.title;

    const preco = document.createElement('span');
    preco.textContent = `${Number(produto.price).toFixed(2)} €`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'X';

    btnRemover.addEventListener('click', () => {
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
        cestoAtual.splice(indexDaLista, 1);
        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
        atualizaCesto();
    });

    article.append(titulo, preco, btnRemover);
    return article;
}

function renderizarProdutos(produtos) {
    produtosContainer.innerHTML = '';
    produtos.forEach(produto => {
        const articleProduto = criarProduto(produto);
        produtosContainer.append(articleProduto);
    });
}

function atualizaCesto() {
    cestoContainer.innerHTML = '';
    const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    let totalPreco = 0;

    cestoAtual.forEach((produto, index) => {
        const articleProdutoCesto = criaProdutoCesto(produto, index);
        cestoContainer.append(articleProdutoCesto);
        totalPreco += Number(produto.price);
    });

    precoTotalElement.textContent = `Total: ${totalPreco.toFixed(2)} €`;
}

function f1() {
    fetch('https://deisishop.pw.deisi.ulusofona.pt/products')
        .then(response => {
            if (!response.ok) throw new Error('Erro produtos: ' + response.status);
            return response.json();
        })
        .then(data => {

            todosOsProdutos = data.map(produto => {
                return {
                    ...produto,
                    price: Number(produto.price),
                    image: 'https://deisishop.pw.deisi.ulusofona.pt' + produto.image
                };
            });

            renderizarProdutos(todosOsProdutos);
        })
        .catch(error => console.error('Falha nos produtos:', error));

    fetch('https://deisishop.pw.deisi.ulusofona.pt/categories')
        .then(response => {
            if (!response.ok) throw new Error('Erro categorias: ' + response.status);
            return response.json();
        })
        .then(categorias => {
            const selectCategoria = document.getElementById('categoria');

            categorias.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.name;
                option.textContent = cat.name;
                selectCategoria.appendChild(option);
            });
        })
        .catch(error => console.error('Falha nas categorias:', error));
}

f1();
atualizaCesto();

const inputPesquisa = document.getElementById('pesquisa');
const selectCategoria = document.getElementById('categoria');
const selectOrdenacao = document.getElementById('ordenacao');

function aplicarFiltros() {
    let produtosFiltrados = [...todosOsProdutos];

    const termo = inputPesquisa.value.toLowerCase();
    if (termo) {
        produtosFiltrados = produtosFiltrados.filter(p => p.title.toLowerCase().includes(termo));
    }

    const categoria = selectCategoria.value;
    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(p => p.category === categoria);
    }

    const ordenacao = selectOrdenacao.value;
    if (ordenacao === 'asc') {
        produtosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordenacao === 'desc') {
        produtosFiltrados.sort((a, b) => b.price - a.price);
    }

    renderizarProdutos(produtosFiltrados);
}

inputPesquisa.addEventListener('input', aplicarFiltros);
selectCategoria.addEventListener('change', aplicarFiltros);
selectOrdenacao.addEventListener('change', aplicarFiltros);

const btnComprar = document.getElementById('btn-comprar');

btnComprar.addEventListener('click', () => {
    const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

    if (cestoAtual.length === 0) {
        alert("O cesto está vazio!");
        return;
    }

    const idsProdutos = cestoAtual.map(produto => produto.id);
    const estudante = document.getElementById('estudante').checked;
    const cupao = document.getElementById('cupao').value;

    const payload = {
        products: idsProdutos,
        student: estudante,
        coupon: cupao
    };

    fetch('https://deisishop.pw.deisi.ulusofona.pt/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    .then(response => response.json().then(data => ({ status: response.status, ok: response.ok, data })))
    .then(res => {
        const resultadoDiv = document.getElementById('checkout-resultado');

        console.log('Resposta da compra:', res.data);

        if (res.ok) {
            const totalCompra = res.data.total !== undefined
                ? res.data.total
                : cestoAtual.reduce((total, produto) => total + Number(produto.price), 0);

            resultadoDiv.innerHTML = `
                <div style="background-color: #d4edda; color: #155724; padding: 10px; border-radius: 4px;">
                    <p><strong>Compra com sucesso!</strong></p>
                    <p>Referência: <b>${res.data.reference}</b></p>
                    <p>Total a pagar: <b>${Number(totalCompra).toFixed(2)} €</b></p>
                </div>
            `;

            localStorage.setItem('produtos-selecionados', JSON.stringify([]));
            atualizaCesto();
        } else {
            resultadoDiv.innerHTML = `
                <div style="background-color: #f8d7da; color: #721c24; padding: 10px; border-radius: 4px;">
                    <p>Erro na compra: ${res.data.error}</p>
                </div>
            `;
        }
    })
    .catch(error => console.error('Erro no checkout:', error));
});
