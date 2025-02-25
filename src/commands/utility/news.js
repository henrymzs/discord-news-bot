const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchNews } = require('../../services/newService.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('news')
        .setDescription('Busca notícias sobre um tema específico.')
        .addStringOption(option =>
            option.setName('tema')
                .setDescription('Informe o tema da notícia')
                .setRequired(true)
        ),

    async execute(interaction) {
        await interaction.deferReply(); // Adicionamos isso para evitar timeout no Discord

        const tema = interaction.options.getString('tema');
        const result = await fetchNews(tema);

        if (!result.success) {
            await interaction.editReply(result.message);
            return;
        }

        const embeds = result.articles.map((article, index) => 
            new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(article.title)
                .setURL(article.url)
                .setDescription(`🔹 **Fonte:** ${article.source.name}`)
                .setImage(article.image) // Adiciona a imagem da notícia
                .setFooter({ text: `Notícia ${index + 1} de ${result.articles.length}` })
        );

        await interaction.editReply({ content: `📰 **Aqui estão algumas notícias sobre _${tema}_:**`, embeds });
    }
};
