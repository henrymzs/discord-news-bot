const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
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

        let index = 0;
        const newsList = result.articles;

        function createEmbed(index) {
            const article = newsList[index];

            return new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(article.title)
                .setURL(article.url)
                .setDescription(article.description || "Sem descrição disponível.")
                .setImage(article.image || null)
                .setFooter({ text: `Fonte: ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString('pt-BR')}` });
        }

        function createButtons(index, total) {
            return new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                    .setCustomId('prev')
                    .setLabel('⏪ Voltar')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(index === 0),
                new ButtonBuilder()
                    .setCustomId('next')
                    .setLabel('⏩ Próxima')
                    .setStyle(ButtonStyle.Primary)
                    .setDisabled(index === total - 1)
            );
        }

        const message = await interaction.editReply({
            embeds: [createEmbed(index)],
            components: [createButtons(index, newsList.length)]
        });

        const collector = message.createMessageComponentCollector({ time: 60000 });

        collector.on('collect', async i => {
            if (i.user.id !== interaction.user.id) return;
            if (i.customId === 'next' && index < newsList.length - 1) index++;
            if (i.customId === 'prev' && index > 0) index--;

            await i.update({
                embeds: [createEmbed(index)],
                components: [createButtons(index, newsList.length)]
            });
        });

        collector.on('end', () => {
            interaction.editReply({ components: [] }).catch(() => {});
        });
        
    }
};
