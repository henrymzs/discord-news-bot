const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { fetchNews } = require('../../services/newService.js');
const { getJaiminhoPhrase } = require('../../utils/jaiminhoPhrases.js');

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
        await interaction.editReply(getJaiminhoPhrase('processing'));

        const tema = interaction.options.getString('tema');
        const result = await fetchNews(tema);

        if (!result.success) {
            return interaction.editReply(getJaiminhoPhrase('noResults'));
        }

        let index = 0;
        const newsList = result.articles;

        function createEmbed(index) {
            const article = newsList[index];
            const embed = new EmbedBuilder()
                .setColor('#0099ff')
                .setTitle(article.title)
                .setURL(article.url)
                .setDescription(article.description || "Sem descrição disponível.")
                .setFooter({ text: `Fonte: ${article.source.name} • ${new Date(article.publishedAt).toLocaleDateString('pt-BR')}` });

            if (article.image) embed.setImage(article.image);
            return embed;

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

        const collector = message.createMessageComponentCollector({ time: 120000 });

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
