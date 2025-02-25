const axios = require('axios');
require('dotenv').config();

const GNEWS_API_URL = 'https://gnews.io/api/v4/search';
const API_KEY = process.env.GNEWS_API_KEY;

async function fetchNews(query) {
    try {
        const response = await axios.get(GNEWS_API_URL, {
            params: { q: query, apikey: API_KEY, language: 'pt-br' },
            timeout: 5000 // timeout para evitar travamento
        });

        if (!response.data.articles.length) {
            return { success: false, message: 'Nenhuma notícia encontrada para esse termo.' };
        }

        const uniqueArticles = [];
        const seenTitles = new Set();

        response.data.articles.forEach(article => {
            if (!seenTitles.has(article.title)) {
                seenTitles.add(article.title);
                uniqueArticles.push(article);
            }
        });;

        return { success: true, articles: response.data.articles.slice(0, 5) }; // apenas as 5 primeiro noticias

    } catch (error) {
        console.error(`Erro ao buscar notícias: ${error.message}`);
        return { sucess: false, message: 'Ocorreu um erro ao buscar notícias. Tente novamente mais tarde. ' };
        
        
    }
}

module.exports = { fetchNews };


