# 🤖 Jaiminho Bot - Notícias no Discord

Jaiminho é um bot do Discord que busca notícias sobre um tema específico e exibe os resultados diretamente no chat do servidor. Ele também permite navegar entre as notícias usando botões de interação.

Estou sempre em busca de aprimorar minhas habilidades, então qualquer feedback sobre o projeto, código, arquitetura ou boas práticas será muito bem-vindo! Se quiser contribuir com sugestões, você pode:

- 📧 Me enviar um e-mail: henrykaua21@gmail.com
- 🔗 Se conectar comigo no [LinkedIn](https://www.linkedin.com/in/henry-kaua/)
- 🐛 Abrir uma [issue](https://github.com/henrymzs/api-todolist/issues) aqui no repositório
- 👽 Notas do que aprendi durante o desenvolvimento desse projeto [Notes](./NOTES.md)

Toda ajuda é muito apreciada e me auxilia a crescer como desenvolvedor. 🚀

## 🚀 Funcionalidades

✅ Busca notícias de tecnologia e outros temas usando a API do GNews.

✅ Exibe os resultados com título, descrição, imagem e link. 

✅ Permite navegar entre as notícias com botões. 

✅ Mensagens personalizadas inspiradas no Jaiminho (personagem do Chaves).

## 🛠️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Discord.js](https://discord.js.org/)
- [Axios](https://axios-http.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## 📂 Estrutura do Projeto

```
📦 discord-news-bot
├── 📂 src
│   ├── 📂 commands
│   │   ├── 📂 utility
│   │   │   └── news.js  
│   ├── 📂 events
│   │   ├── interactionCreate.js 
│   ├── 📂 services
│   │   ├── newService.js  
│   ├── 📂 utils
│   │   ├── jaiminhoPhrases.js 
│   ├── index.js 
    ├── deploy-commands.js 
├── .env  
├── package.json  
└── README.md  

## 🔧 Configuração e Instalação

### 1️⃣ Pré-requisitos

Antes de iniciar, você precisará:

- Node.js instalado (versão 16+)
- Uma conta no Discord e um servidor para adicionar o bot
- Uma API Key do [GNews](https://gnews.io/)

### 2️⃣ Clonar o repositório

```s
git clone https://github.com/henrymzs/discord-news-bot.git
cd seu-repositorio
```

### 3️⃣ Instalar dependências

```sh
npm install
```

### 4️⃣ Configurar variáveis de ambiente

Crie um arquivo **.env** na raiz do projeto e adicione:

```env
DISCORD_TOKEN=seu_token_do_bot
CLIENT_ID=seu_id_do_bot
GUILD_ID=seu_id_do_servidor
GNEWS_API_KEY=sua_api_key_do_gnews
```

### 5️⃣ Registrar os comandos no Discord

```sh
node deploy-commands.js
```

### 6️⃣ Iniciar o bot

```sh
node src/index.js
```

## 🛠 Como Usar

Após iniciar o bot, use o comando:

```sh
/news tecnologia
```

🔹 O bot buscará as últimas notícias sobre o tema digitado. 

🔹 Você poderá navegar entre as notícias usando os botões "⏪ Voltar" e "⏩ Próxima".

## 🚀 Contribuição

1. Faça um fork do repositório.
2. Crie uma branch para sua funcionalidade (`git checkout -b minha-feature`).
3. Faça as alterações e commit (`git commit -m 'Adicionei uma nova feature'`).
4. Faça o push para a branch (`git push origin minha-feature`).
5. Abra um Pull Request.


