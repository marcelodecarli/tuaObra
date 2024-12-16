
// Função de logout
function logout() {

    // Redirecionar para a página de login
    window.location.href = "../html/telaLogin.html"; // Redireciona para a página de login
}

// Adicionar evento ao botão de logout
document.getElementById("sairButton").addEventListener("click", (e) => {
    e.preventDefault(); // Impede o comportamento padrão do link
    logout(); // Chama a função de logout
});
