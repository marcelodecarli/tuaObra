
//Seleciona o botão com o ID login e .addEventListener("click", function(event):
//Adiciona um "ouvinte" de evento que escuta o clique no botão e executa a função fornecida
document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault(); // Impede que a ação padrão do botão ocorra, como enviar um formulário ou recarregar a página

    // Pega os dados do formulário selecionando ele document.querySelector("input[type='email']") e pegando o valor .value
    //e é armazendo na sua respectiva variável
    const email = document.querySelector("input[type='email']").value;
    const senha = document.querySelector("input[type='password']").value;

    // Chamada da função para confirmação os dados do usuário
    confirmarDados(email, senha);
});

//Função que realiza uma verificação de login consultando o servidor local para validar os dados fornecidos
function confirmarDados(email, senha) {
    //Faz uma requisição HTTP para o endpoint (fornecido no server.js)
    fetch("http://localhost:3000/buscar-usuarios")

        //Converte a resposta da requisição para um objeto JavaScript,
        //considerando que a resposta seja um JSON
        .then(response => response.json())

        .then(data => {
            //Procura na lista de usuários um objeto cujo email e senha correspondam aos fornecidos
            const usuario = data.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                alert("Login bem-sucedido!");
                // Redireciona para a página de opções
                window.location.href = "./telaOpcoes.html";

                //Se nenhum usuário correspondente for encontrado,
                //  exibe uma mensagem de erro e redireciona para a página de login
            } else {
                alert("Email ou senha incorretos.");
                //Mantém na página da ação
                window.location.href = "../../index.html";

            }
        })

        //Captura qualquer erro que ocorra durante a requisição ou processamento.
        //Exibe o erro no console e uma mensagem de erro ao usuário,
        //redirecionando para a página de login.

        .catch(error => {
            console.error("Erro ao verificar os dados do usuário:", error);
            alert("Erro ao fazer login. Tente novamente.");
            window.location.href = "./telaLogin.html";

        });
}




