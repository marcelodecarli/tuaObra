//Função que vai realizar a captura dos dados passados na tela e salvará no nosso arquivo json, simulando um banco de dados

function salvarDados() {
    const material = document.getElementById("material").value;
    const quantidade = document.getElementById("quantidade").value;
    const radioButtons = document.getElementById("radioButtons").value;
    const endereco = document.getElementById("endereco").value;
    const descricao = document.getElementById("descricao").value;
    const imagensInput = document.getElementById("imagens").files;

    //verifica se tem imagem, caso não tenho ele solicita a adição da imagem, pois é um itém obrigatório
    if (imagensInput.length === 0) {
        alert("Por favor, selecione uma imagem.");
        return;
    }

    // Converte as imagens para Base64

    //Criando uma instancia do FileReader no qual permite ler arquivos como imagens no navegador;
    const leitor = new FileReader();
    //após o arquivo ser carregado ele define uma função para executar a leitura desse arquivo (imagem)
    //ela (imagem) será convertida em uma string Base64 acessível através de event.target.result
    leitor.onload = function (event) {

        //Aqui armazenará a string Base64 resultante do arquivo (imagem) carregado(a)
        const imagemBase64 = event.target.result;

        // Criará um objeto contendo todos os dados passado pelo usuário, incluindo a imagem já convertida.
        const dadosUsuario = {
            material: material,
            quantidade: quantidade,
            radioButtons: radioButtons,
            endereco: endereco,
            descricao: descricao,
            imagens: imagemBase64  // Salva na constante - const imagemBase64 = event.target.result;
        };

        // Enviando os dados para o servidor
        fetch("http://localhost:3000/salvar-item", {
            //Método utilizado
            method: "POST",
            //Aqui ele define - Content-Type: application/json - para informar ao servidor que os dados estão em formato JSON.
            headers: {
                "Content-Type": "application/json"
            },
            //Aqui ele converte dadosUsuario para uma string JSON
            body: JSON.stringify(dadosUsuario)
        })

        //Verificação se a resposta foi bem-sucedida (response.ok) e lança um erro caso ela não tenha sido bem-sucedida.
        .then(response => {
            if (!response.ok) throw new Error("Erro ao salvar dados"); //Erro retornado
            return response.text();
        })

        //Captura e exibe o erro ou os erros que ocorrerem durante a solicitação.

        .catch(error => {
            console.error("Erro:", error);
        });
    };

    // Lê a imagem como uma string Base64
    leitor.readAsDataURL(imagensInput[0]);
}
