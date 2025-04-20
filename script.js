document.querySelectorAll('.carrossel-container').forEach((carrosselContainer) => {
    const todosProdutos = carrosselContainer.querySelector('.todosProdutos');
    const btnNext = carrosselContainer.querySelector('.btn-next');
    const btnPrev = carrosselContainer.querySelector('.btn-prev');

    let produtos = carrosselContainer.querySelectorAll('.containerProduto');
    const produtoWidth = 268;
    let currentIndex = 1;
    let isAnimating = false;

    const primeiroProduto = produtos[0];
    const ultimoProduto = produtos[produtos.length - 1];
    const clonePrimeiro = primeiroProduto.cloneNode(true);
    const cloneUltimo = ultimoProduto.cloneNode(true);

    todosProdutos.insertBefore(cloneUltimo, produtos[0]);
    todosProdutos.appendChild(clonePrimeiro);

    produtos = carrosselContainer.querySelectorAll('.containerProduto');

    todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;

    function moveCarrossel(direction) {
        if (isAnimating) return;
        isAnimating = true;

        if (direction === 'next') {
            currentIndex++;
        } else {
            currentIndex--;
        }

        todosProdutos.style.transition = 'transform 0.5s ease-in-out';
        todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;

        todosProdutos.addEventListener('transitionend', handleTransitionEnd);

        function handleTransitionEnd() {
            todosProdutos.removeEventListener('transitionend', handleTransitionEnd);

            if (currentIndex === produtos.length - 1) {
                currentIndex = 1;
                todosProdutos.style.transition = 'none';
                todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;
            } else if (currentIndex === 0) {
                currentIndex = produtos.length - 2;
                todosProdutos.style.transition = 'none';
                todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;
            }

            isAnimating = false;
        }
    }

    btnNext.addEventListener('click', () => moveCarrossel('next'));
    btnPrev.addEventListener('click', () => moveCarrossel('prev'));
});


let lastClickedDepartamento = null;




function clickMenu1() {
    const TodasCatItens = document.getElementById('TodasCatItens');
    const DepartamentoMenu = document.getElementById('DepartamentoMenu');
    const iBurguer = document.getElementById('iBurguer');

    // Fecha o menu de departamentos e limpa seleção de departamentos
    DepartamentoMenu.style.display = 'none';
    lastClickedDepartamento = null;

    // Remove classe 'ativo' de todos os departamentos
    document.querySelectorAll('.dep-link').forEach(link => {
        link.classList.remove('ativo');
    });

    // Alterna o menu de categorias e a cor do botão
    if (TodasCatItens.style.display === 'none' || TodasCatItens.style.display === '') {
        TodasCatItens.style.display = 'flex';
        iBurguer.classList.add('ativo');
    } else {
        TodasCatItens.style.display = 'none';
        iBurguer.classList.remove('ativo');
    }
}


function clickMenu2(element) {
    const DepartamentoMenu = document.getElementById('DepartamentoMenu');
    const TodasCatItens = document.getElementById('TodasCatItens');
    const departamentoID = element.getAttribute('data-departamento');
    const currentLink = element.querySelector('.dep-link');
    const iBurguer = document.getElementById('iBurguer');

    // Esconde o menu de categorias e tira a cor azul do botão iBurguer
    TodasCatItens.style.display = 'none';
    iBurguer.classList.remove('ativo');

    // Remove a classe 'ativo' de todos os departamentos
    document.querySelectorAll('.dep-link').forEach(link => {
        link.classList.remove('ativo');
    });

    // Alterna o menu de departamentos e a seleção
    if (lastClickedDepartamento === departamentoID && DepartamentoMenu.style.display === 'flex') {
        DepartamentoMenu.style.display = 'none';
        lastClickedDepartamento = null;
    } else {
        DepartamentoMenu.style.display = 'flex';
        currentLink.classList.add('ativo');
        lastClickedDepartamento = departamentoID;
    }
}

function alternarH5(elementoClicado) {
    const blocoPai = elementoClicado.closest('.CentralAjuda, .Institu, .Atendimento');
    const h5s = blocoPai.querySelectorAll('h5');
  
    h5s.forEach(h5 => {
      h5.style.display = (h5.style.display === 'none' || h5.style.display === '') ? 'block' : 'none';
    });
  
    // Gira a setinha do bloco clicado
    const setinha = blocoPai.querySelector('.setinhaBaixa img');
    setinha.classList.toggle('setinhaGirada');
  }