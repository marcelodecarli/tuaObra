//Importação dos módulos e ou frameworks

const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

//Criando uma instância do servidor Express
const app = express();

//Habilita CORS, permitindo que o servidor receba requisições de diferentes origens
app.use(cors());
//Configura o servidor para interpretar requisições com payloads JSON
app.use(express.json());


// Rota para salvar os dados do usuário a partir de uma requisição POST
app.post("/salvar-usuario", (req, res) => {

    //aqui está extraindo os dados enviados na requisição e os armazena na variável novoUsuario
    const novoUsuario = req.body;

    // Lê o arquivo de usuários (user.json) no formato de texto (utf8)

    fs.readFile(path.join(__dirname, "user.json"), "utf8", (err, data) => {
        //verificação de erro Retornando um erro 500 - indicando erro interno
        if (err) {
            console.error("Erro ao ler o arquivo user.json:", err);
            return res.status(500).send("Erro no servidor ao ler o arquivo user.json");
        }

        //Inicializando o array para armazenar usuários
        let usuarios = [];
        try {

            //Aqui nessa etapa é realizada a conversão do conteúdo do arquivo de texto para um objeto JSON
            usuarios = JSON.parse(data);
            //Se caso ocorra um erro ao interpretar o JSON, ele é tratado e exibido no console para verificação e onde está ocorrendo
        } catch (parseError) {
            console.error("Erro ao parsear o arquivo user.json:", parseError);
        }

        // Adiciona o novo usuário (usuarios) ao array novoUsuario
        usuarios.push(novoUsuario);

        // Grava os dados no arquivo user.json
        fs.writeFile(path.join(__dirname, "user.json"), JSON.stringify(usuarios, null, 2), (writeErr) => {

            //Se ocorrer um erro ao gravar o arquivo, ele é tratado e exibido no console
            if (writeErr) {
                console.error("Erro ao escrever no arquivo user.json:", writeErr);
                return res.status(500).send("Erro no servidor ao salvar os dados no user.json");
            }

            //Retorna uma resposta de sucesso ao cliente
            res.status(200).json({ success: true });
        });
    });
});


// Rota para salvar os dados do item a  partir de uma requisição POST
app.post("/salvar-item", (req, res) => {

    //aqui está extraindo os dados enviados na requisição e os armazena na variável novoItem
    const novoItem = req.body;

    // Lê o arquivo de dados dos itens (data.json) no formato de texto (utf8)
    fs.readFile(path.join(__dirname, "data.json"), "utf8", (err, data) => {
        //verificação de erro Retornando um erro 500 - indicando erro interno
        if (err) {
            console.error("Erro ao ler o arquivo data.json:", err);
            return res.status(500).send("Erro no servidor ao ler o arquivo data.json");
        }

        //Inicializando o array para armazenar os itens
        let itens = [];
        //Aqui nessa etapa é realizada a conversão do conteúdo do arquivo de texto para um objeto JSON
        try {
            itens = JSON.parse(data);
            //Se caso ocorra um erro ao interpretar o JSON, ele é tratado e exibido no console para verificação e onde está ocorrendo
        } catch (parseError) {
            console.error("Erro ao parsear o arquivo data.json:", parseError);
        }

        // Adiciona o novo item(itens) ao array novoItem 
        itens.push(novoItem);

        // Grava os dados no arquivo data.json
        fs.writeFile(path.join(__dirname, "data.json"), JSON.stringify(itens, null, 2), (writeErr) => {

            //Se ocorrer um erro ao gravar o arquivo, ele é tratado e exibido no console
            if (writeErr) {
                console.error("Erro ao escrever no arquivo data.json:", writeErr);
                return res.status(500).send("Erro no servidor ao salvar os dados no data.json");
            }

            //Retorna uma resposta de sucesso ao cliente
            res.status(200).send("Item salvo com sucesso");
        });
    });
});


// Rota para buscar os dados dos usuários a  partir de uma requisição GET
app.get("/buscar-usuarios", (req, res) => {

    //Aqui faz a busca no arquivo user.json localizado no diretório atual (__dirname), usando a codificação utf8
    fs.readFile(path.join(__dirname, "user.json"), "utf8", (err, data) => {
        //Verificação de erro e caso ocorra um erro ao ler o arquivo, o erro é exibido no console
        if (err) {
            console.error("Erro ao ler o arquivo:", err);
            //Responde com o status 500 (erro interno do servidor) e uma mensagem indicando falha na leitura
            return res.status(500).json({ success: false, message: "Erro ao ler os dados dos usuários." });
        }

        try {
            //Aqui ele coverterá um arquivo JSON para um objeto Javascript
            const usuarios = JSON.parse(data);

            //Retorna uma resposta de sucesso (200 OK) com os dados dos usuários
            res.status(200).json(usuarios);
            //Se houver um erro ao interpretar o arquivo JSON (por exemplo, devido a dados inválidos), o erro é tratado e exibido no console
        } catch (parseError) {
            //Envia uma resposta de erro ao cliente se ocorrer um problema na conversão
            console.error("Erro ao parsear o arquivo:", parseError);
            res.status(500).json({ success: false, message: "Erro ao processar os dados." });
        }
    });
});



// Inicia o servidor
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
