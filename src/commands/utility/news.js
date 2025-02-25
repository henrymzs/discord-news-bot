const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios'); // Confirme que o axios está instalado

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Obtém notícias sobre um tema específico')
        .addStringOption(option => 
            option.setName('tema')
                .setDescription('Tema da notícia')
                .setRequired(true)
        ),
    async execute(interaction) {
        const tema = interaction.options.getString('tema');

        try {
            const response = await axios.get(`https://gnews.io/api/v4/search?q=${tema}&lang=pt&token=${process.env.GNEWS_API_KEY}`);
            const articles = response.data.articles;

            if (articles.length === 0) {
                await interaction.reply('Nenhuma notícia encontrada.');
                return;
            }

            const newsMessage = articles.slice(0, 3).map(article => `📰 **${article.title}**\n🔗 ${article.url}`).join('\n\n');
            await interaction.reply(newsMessage);
        } catch (error) {
            console.error('Erro ao buscar notícias:', error);
            await interaction.reply('Erro ao buscar notícias.');
        }
    },
};
