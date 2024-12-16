function redirecionar(event) {
    event.preventDefault(); // Evita o comportamento padrão de enviar o formulário

    // Captura os dados do formulário
    const usuario = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        senha: document.getElementById("password").value,
        confirmaSenha: document.getElementById("confirmaPassword").value
    };

    // Verifica se as senhas são iguais
    if (usuario.senha !== usuario.confirmaSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    // Verifica se o usuário já está cadastrado
    fetch("http://localhost:3000/buscar-usuarios")
        .then(response => response.json())
        .then(data => {
            const usuarioExistente = data.find(
                user => user.cpf === usuario.cpf || user.email === usuario.email
            );

            if (usuarioExistente) {
                alert("Usuário já cadastrado com este CPF ou Email.");
                document.getElementById("nome").value = "";
                document.getElementById("cpf").value = "";
                document.getElementById("telefone").value = "";
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                document.getElementById("confirmaPassword").value = "";
                return; 
            } else {
                cadastrarUsuario(usuario);
            }
        })
        .catch(error => {
            console.error("Erro ao verificar usuários existentes:", error);
            alert("Erro de conexão ao verificar usuários.");
        });
}

// Função para cadastrar o usuário
function cadastrarUsuario(usuario) {
    fetch("http://localhost:3000/salvar-usuario", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Usuário cadastrado com sucesso!");
                window.location.href = "../html/telaLogin.html";  // Ajuste conforme sua estrutura
            } else {
                alert("Erro ao cadastrar o usuário.");
            }
        })
        .catch(error => {
            console.error("Erro ao enviar os dados:", error);
            alert("Erro ao cadastrar o usuário.");
        });
}
