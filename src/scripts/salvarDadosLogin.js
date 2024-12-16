/* Verifica se o usuário deixar marcada a opção de salvar os dados */

document.addEventListener("DOMContentLoaded", () => {
    // Aqui no if a condição é que se no localStorage está salvo os dados ele preenche os campos automaticamente
    if (localStorage.getItem("email") && localStorage.getItem("senha")) {

        //Aqui ele está atribuindo os valores do localstorage para o input do programa, para ocorrer a validação do login e ter dados nessa entrada
        document.querySelector("#emailEntrada input").value = localStorage.getItem("email");
        document.querySelector("#passwordEntrada input").value = localStorage.getItem("senha");

        // Mantém o checkbox marcado com true
        document.getElementById("senhaSalva").checked = true; 
    }

    // Evento de login a partir daqui


    // Aqui ele impede o envio do formulário, já que não há um formulário real do tipo form e sim só um botão
    document.getElementById("login").addEventListener("click", (e) => {
        e.preventDefault(); 

        //Aqui estamos recebendo os valores dos inputs e salvando em variáveis para serem verificadas
        const email = document.querySelector("#emailEntrada input").value;
        const senha = document.querySelector("#passwordEntrada input").value;
        const salvarDados = document.getElementById("senhaSalva").checked;

        // aqui vai verificar se os campos de email e senha não estão vazios
        if (email && senha) {
            // Se o usuário marcou a opção "Salvar Dados"
            if (salvarDados) {
                // Aqui ele vai salvar os dados no localStorage se estiver marcado o checkbox, consequentemente ele fica true
                localStorage.setItem("email", email);
                localStorage.setItem("senha", senha);
            } else {
                // Aqui caso a caixa de seleção não está marcada, removerá os dados do localStorage
                localStorage.removeItem("email");
                localStorage.removeItem("senha");
            }

            // Exemplo de redirecionamento
            window.location.href = "./telaOpcoes.html";  // Redireciona após login
        } else {
            alert("Por favor, preencha o email e a senha.");
            //Mantém na tela do login
            window.location.href = "./telaLogin.html"
        }
    });
});
