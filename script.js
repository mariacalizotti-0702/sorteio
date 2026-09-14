// Lista com 10 países diferentes e suas respectivas dicas
const paises = [
    { nome: "Brasil", dica: "Conhecido pelo Carnaval, pelo futebol e pela floresta amazônica." },
    { nome: "Japão", dica: "Famoso pela tecnologia avançada, cultura anime e o Monte Fuji." },
    { nome: "Canadá", dica: "País muito frio na América do Norte, famoso pela folha de bordo (Maple) e xarope." },
    { nome: "França", dica: "Lar da Torre Eiffel, de perfumes famosos e da culinária requintada." },
    { nome: "Austrália", dica: "Conhecido pelos cangurus, coalas e praias de surf." },
    { nome: "Argentina", dica: "Famoso pelo tango, pela carne bovina e pelos hermanos sul-americanos." },
    { nome: "Itália", dica: "Formato de bota, famoso pelas massas, pizza e pela cidade de Roma." },
    { nome: "Egito", dica: "Conhecido pelas pirâmides milenares e pelo Rio Nilo." },
    { nome: "Índia", dica: "País super populoso do Sul da Ásia, lar do Taj Mahal." },
    { nome: "Alemanha", dica: "Famoso pela festa da Oktoberfest, carros potentes e salsichas." }
];

let score = 0;
let paisAtual = {};

const scoreElement = document.getElementById("score");
const tipTextElement = document.getElementById("tipText");
const userGuessInput = document.getElementById("userGuess");
const guessButton = document.getElementById("guessButton");
const messageElement = document.getElementById("message");
const nextButton = document.getElementById("nextButton");

// Função para sortear um país aleatório e exibir a dica
function sortearPais() {
    const indiceAleatorio = Math.floor(Math.random() * paises.length);
    paisAtual = paises[indiceAleatorio];
    tipTextElement.textContent = paisAtual.dica;
}

// Função para normalizar texto (remover acentos e letras maiúsculas para facilitar a digitação)
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

// Evento de clique no botão de enviar resposta
guessButton.addEventListener("click", () => {
    const palpite = userGuessInput.value;

    if (palpite === "") {
        alert("Por favor, digite o nome de um país!");
        return;
    }

    // Compara o palpite do usuário com o país sorteado
    if (normalizarTexto(palpite) === normalizarTexto(paisAtual.nome)) {
        messageElement.textContent = "VOCE ACERTOU";
        messageElement.className = "message success";
        score++;
        scoreElement.textContent = score;
    } else {
        messageElement.textContent = `VOCE ERROU (Era: ${paisAtual.nome})`;
        messageElement.className = "message error";
    }

    // Desativa o input/botão e mostra a opção de próxima rodada
    userGuessInput.disabled = true;
    guessButton.classList.add("hidden");
    nextButton.classList.remove("hidden");
});

// Evento para avançar para a próxima rodada
nextButton.addEventListener("click", () => {
    userGuessInput.value = "";
    userGuessInput.disabled = false;
    messageElement.textContent = "";
    messageElement.className = "message";
    guessButton.classList.remove("hidden");
    nextButton.classList.add("hidden");
    
    sortearPais();
    userGuessInput.focus();
});

// Inicializa o primeiro sorteio ao carregar a página
sortearPais();