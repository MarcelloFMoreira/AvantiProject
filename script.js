
const todosProdutos = document.querySelector(".todosProdutos");
const btnNext = document.querySelector(".btn-next");
const btnPrev = document.querySelector(".btn-prev");

let produtos = document.querySelectorAll(".containerProduto");
const produtoWidth = 268; 
let currentIndex = 1; 


const primeiroProduto = produtos[0];
const ultimoProduto = produtos[produtos.length - 1];
const clonePrimeiro = primeiroProduto.cloneNode(true);
const cloneUltimo = ultimoProduto.cloneNode(true);

todosProdutos.insertBefore(cloneUltimo, produtos[0]); 
todosProdutos.appendChild(clonePrimeiro); 

produtos = document.querySelectorAll(".containerProduto");


todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;


function moveCarrossel(direction) {
    if (direction === "next") {
        currentIndex++;
        todosProdutos.style.transition = "transform 0.5s ease-in-out";
    } else {
        currentIndex--;
        todosProdutos.style.transition = "transform 0.5s ease-in-out";
    }

    todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;


    setTimeout(() => {
        if (currentIndex === produtos.length - 1) {
            currentIndex = 1;
            todosProdutos.style.transition = "none";
            todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;
        } else if (currentIndex === 0) {
            currentIndex = produtos.length - 2;
            todosProdutos.style.transition = "none";
            todosProdutos.style.transform = `translateX(-${produtoWidth * currentIndex}px)`;
        }
    }, 500);
}

btnNext.addEventListener("click", () => moveCarrossel("next"));
btnPrev.addEventListener("click", () => moveCarrossel("prev"));

