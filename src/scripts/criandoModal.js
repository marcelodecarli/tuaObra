//Aqui é uma função usada para exibir um modal com informações
//detalhadas de um item (material, quantidade, endereço, descrição e imagem)
function criarModal(item) {
    document.getElementById("modal-material").textContent = item.material;
    document.getElementById("modal-quantidade").textContent = item.quantidade;
    document.getElementById("modal-endereco").textContent = item.endereco;
    document.getElementById("modal-descricao").textContent = item.descricao;
    document.getElementById("modal-imagem").src = item.imagens;
    document.getElementById("modal").style.display = "flex";
}


// Fecha o modal ao clicar no botão de fechar
document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("modal").style.display = "none";
});

// Fecha o modal ao clicar fora do conteúdo
window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

// Executa ao carregar a página
window.onload = exibirMateriais;
