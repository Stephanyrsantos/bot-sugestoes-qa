  login: [
    "🔐 Validar login com credenciais válidas e inválidas.",
    "🕵️‍♂️ Verificar tentativa de login com SQL Injection.",
    "📵 Testar comportamento ao desativar o JavaScript no login.",
    "🔁 Verificar fluxo de recuperação de senha e expiração de token."
  ],
  cadastro: [
    "📝 Validar preenchimento obrigatório e formatos (email, CPF, senha).",
    "🔄 Verificar duplicidade de usuários cadastrados.",
    "⚠️ Testar mensagens de validação e erros nos campos.",
    "📩 Confirmar envio de email de confirmação/validação quando necessário."
  ],
  busca: [
    "🔍 Testar busca com palavras-chave válidas e inválidas.",
    "🔁 Verificar busca com letras maiúsculas/minúsculas, acentos e espaços extras.",
    "🚫 Validar comportamento ao buscar com campo vazio.",
    "📉 Verificar performance da busca com grandes volumes de dados."
  ],
  checkout: [
    "🛒 Validar se o botão 'Finalizar compra' está habilitado apenas com todos os campos preenchidos.",
    "💳 Testar diferentes formas de pagamento e mensagens de erro para cada uma.",
    "🚚 Simular cálculo de frete com diferentes CEPs e cenários de indisponibilidade.",
    "🔄 Verificar se os valores de itens, frete e total estão sendo atualizados corretamente ao alterar o carrinho.",
    "📦 Testar se é possível finalizar a compra com itens fora de estoque (deve bloquear ou alertar).",
    "🕒 Simular comportamento com sessão expirada durante o checkout.",
    "🔐 Validar se o checkout exige autenticação quando necessário.",
    "🌐 Testar fluxos em diferentes navegadores e dispositivos.",
    "📱 Verificar responsividade e usabilidade mobile em cada etapa do checkout.",
    "📤 Verificar envio correto das informações da compra na finalização (ex: payload ou request)."
  ],
  chatbot: [
    "💬 Verificar se o chatbot responde corretamente a comandos válidos.",
    "❓ Testar comportamento com entradas inesperadas ou frases ambíguas.",
    "🕒 Validar tempo de resposta e mensagens de carregamento.",
    "🧠 Testar capacidade de entender variações de uma mesma pergunta.",
    "🔄 Testar reset de conversa e persistência de sessão.",
    "📶 Verificar funcionamento offline ou com conexão instável (fallbacks)."
  ]
};

const campoInput = document.getElementById('campo');
const respostaDiv = document.getElementById('resposta');
const botaoEnviar = document.getElementById('botao-enviar');

function criarMensagem(texto, tipo) {
  const div = document.createElement("div");
  div.classList.add("chat-bubble", tipo);
  div.innerText = texto;
  respostaDiv.appendChild(div);
  respostaDiv.scrollTop = respostaDiv.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
  criarMensagem("👋 Olá! Eu sou o QA Helper Bot. Como posso te ajudar hoje?", "bot");
});

function limparTexto(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/s$/, ""); 
}

function pesquisar() {
  const termoOriginal = campoInput.value.trim();
  if (!termoOriginal) return;

  criarMensagem(termoOriginal, "user");
  campoInput.value = "";

  const termo = limparTexto(termoOriginal);
  const sugestoes = sugestoesPorTema[termo];

  if (sugestoes) {
    sugestoes.forEach(sugestao => criarMensagem(sugestao, "bot"));
  } else {
    criarMensagem("⚠️ Não encontrei sugestões para esse tema. Tente usar palavras como 'login', 'checkout', 'cadastro', 'chatbot' ou 'busca'.", "bot");
  }
}


campoInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    pesquisar();
  }
});


botaoEnviar.addEventListener("click", pesquisar);
