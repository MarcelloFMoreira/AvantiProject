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