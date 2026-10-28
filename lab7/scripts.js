// A. Estado e variáveis com referência de elementos do DOM
const produtosContainer = document.getElementById('produtos'); // Antes estava 'produtos-container'
const cestoContainer = document.getElementById('cesto');       // Antes estava 'cesto-container'

// Como não tem um elemento para o preço total no seu HTML atual,
// pode criá-lo dinamicamente ou adicioná-lo ao HTML depois.
// Por agora, vamos criar um elemento de texto para o preço para não dar erro:
let precoTotalElement = document.getElementById('preco-total');
if (!precoTotalElement) {
    precoTotalElement = document.createElement('h3');
    precoTotalElement.id = 'preco-total';
    cestoContainer.after(precoTotalElement); // Insere logo a seguir à secção do cesto
}

// Array de produtos fornecido
const produtos = [
  { "id": 1, "title": "O mundo do binário", "price": 22.5, "description": "Mostra ao mundo que percebes de matemática...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-1-1.png", "rating": { "rate": 4.7, "count": 200 } },
  { "id": 10, "title": "As 6 fases do debugging", "price": 13, "description": "A jornada épica de todo programador...", "category": "Canecas", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/mug-debugging.png", "rating": { "rate": 3.8, "count": 230 } },
  { "id": 7, "title": "Hello World", "price": 7.5, "description": "Para quem vive entre o código e o estilo!...", "category": "Meias", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/socks-00.png", "rating": { "rate": 4.2, "count": 125 } },
  { "id": 12, "title": "do or do not. no try", "price": 19.85, "description": "Sabias que até o mestre Yoda...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/do-or-do-not.png", "rating": { "rate": 4.5, "count": 132 } },
  { "id": 4, "title": "10 tipos de pessoas", "price": 19.9, "description": "Para os amantes de códigos e piadas geek...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-10.png", "rating": { "rate": 4.7, "count": 322 } },
  { "id": 8, "title": "Erro 404: não estou disponível!", "price": 18.5, "description": "Quando o mundo tenta chamar a tua atenção...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt_Error.png", "rating": { "rate": 4.7, "count": 100 } },
  { "id": 6, "title": "não perturbar, estou a programar!", "price": 7.5, "description": "A solução perfeita para quem não consegue desligar...", "category": "Meias", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/do-not-disturb.png", "rating": { "rate": 3.2, "count": 67 } },
  { "id": 5, "title": "comer, programar, dormir, repetir!", "price": 16.5, "description": "A rotina perfeita para quem vive no loop infinito...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-eat-sleep-code.png", "rating": { "rate": 4.3, "count": 234 } },
  { "id": 3, "title": "És o CSS do meu HTML", "price": 25, "description": "A combinação perfeita entre estilo e estrutura!...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-css.png", "rating": { "rate": 4.9, "count": 250 } },
  { "id": 9, "title": "odeio.. adoro programar!", "price": 12, "description": "Aquela montanha-russa emocional que só quem programa conhece...", "category": "Canecas", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/mug-programming.png", "rating": { "rate": 4.6, "count": 99 } },
  { "id": 2, "title": "Programar: 10% vs. 90%", "price": 20, "description": "Quando achas que já entendeste o problema...", "category": "T-shirts", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/tshirt-10-90.png", "rating": { "rate": 3.8, "count": 150 } },
  { "id": 11, "title": "se café vazio...", "price": 14, "description": "O código perfeito para quem sabe que a vida de um programador...", "category": "Canecas", "image": "https://deisishop.pythonanywhere.com/media/produto_imagens/muf-coffee.png", "rating": { "rate": 3.6, "count": 140 } }
];


// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement('article');
    article.classList.add('produto');

    const img = document.createElement('img');
    img.src = produto.image;
    img.alt = produto.title;

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const preco = document.createElement('h4');
    preco.textContent = `Preço: ${produto.price.toFixed(2)} €`;

    const btnAdicionar = document.createElement('button');
    btnAdicionar.textContent = '+ Adicionar ao cesto';

    // EventListener para adicionar o produto ao cesto
    btnAdicionar.addEventListener('click', () => {
        // 1. Obter cesto atual
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));
        // 2. Adicionar novo produto
        cestoAtual.push(produto);
        // 3. Guardar novamente no localStorage
        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
        // 4. Atualizar o DOM
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
    preco.textContent = `${produto.price.toFixed(2)} €`;

    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'X';

    // EventListener para remover o produto do cesto
    btnRemover.addEventListener('click', () => {
        const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));

        // Remove 1 elemento na posição 'indexDaLista'
        // (usamos o index em vez do ID para remover apenas UM se houver repetidos)
        cestoAtual.splice(indexDaLista, 1);

        localStorage.setItem('produtos-selecionados', JSON.stringify(cestoAtual));
        atualizaCesto();
    });

    article.append(titulo, preco, btnRemover);

    return article;
}


// C. Event handlers
function renderizarProdutos(produtos) {
    // 1. Limpa o container
    produtosContainer.innerHTML = '';

    // 2. Percorre os produtos e cria os articles
    produtos.forEach(produto => {
        console.log(produto.title); // Como pedido no passo 2

        const articleProduto = criarProduto(produto);
        produtosContainer.append(articleProduto);
    });
}

function atualizaCesto() {
    cestoContainer.innerHTML = '';
    const cestoAtual = JSON.parse(localStorage.getItem('produtos-selecionados'));
    let totalPreco = 0;

    cestoAtual.forEach((produto, index) => {
        const articleProdutoCesto = criaProdutoCesto(produto, index);
        cestoContainer.append(articleProdutoCesto);

        totalPreco += produto.price; // Somar ao total
    });

    // Atualiza o texto do preço total
    precoTotalElement.textContent = `Total: ${totalPreco.toFixed(2)} €`;
}


// D. Event Listeners
// Nota: Os event listeners dos botões (Adicionar e Remover) foram atribuídos
// de forma dinâmica dentro das funções criarProduto e criaProdutoCesto.


// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
