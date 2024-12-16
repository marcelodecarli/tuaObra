//A função criarSection(item) cria dinamicamente uma nova section 
// contendo informações resumidas do item: material, quantidade e imagem somente
function criarSection(item) {
    const section = document.createElement("section");

    //Criação da section no HTML
    section.innerHTML = `
        <p>Material: <span>${item.material}</span></p>
        <p>Quantidade: <span>${item.quantidade}</span>
        <img src="${item.imagens}" alt="${item.material}" style="width: 150px; height: 150px;">
    `;

    // Adiciona o evento para abrir o modal
    section.addEventListener("click", () => criarModal(item));

    // A section é retornada para ser inserida na página
    return section;
}


//carrega e exibi os materiais do nosso arquivo JSON na página web
function exibirMateriais() {
    //Caminho para buscar o arquivo data.json, que contém os dados dos materiais
    fetch('../js/data.json')
        .then(response => {
            //Verifica se a resposta foi bem-sucessedida, caso não, retorna um erro
            if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');
            return response.json();
        })
        .then(materiais => {

            //Seleciona o elemento da página onde os materiais serão exibidos
            //(com a classe conteudo)
            const container = document.querySelector(".conteudo");

            if (materiais.length > 0) {
                container.innerHTML = "";  // Limpa a área de conteúdo

                //Itera sobre cada item no array de materiais retornado.
                materiais.forEach(item => {

                    //Para cada material, chama a função criarSection(item),
                    //que cria uma section no HTML com os dados do material.

                    const section = criarSection(item);

                    // Adiciona a section à página
                    container.appendChild(section);
                });
            } else {

                //Caso não tenho nada salvo no nosso arquivo JSON exibirá essa mensagem no nosso HTML
                container.innerHTML = "<p>Nenhum material disponível.</p>";
            }
        })
        //Em caso de erro durante a requisição ou ao processar o JSON, exibe um erro no console.
        .catch(error => console.error("Erro:", error));
}
// Executa ao carregar a página
window.onload = exibirMateriais;
