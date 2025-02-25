const jaiminhoPhrases = {
    processing: [
        'Jaiminho está evitando a fadiga... mas já estou cuidando disso!',
        'Isso está me dando muito trabalho... Mas eu evito a fadiga depois!'
    ],
    noResults: [
        'Nem o carteiro de Tangamandápio entregaria uma notícia dessas...'
    ],
};

function getJaiminhoPhrase(category) {
    const phrases = jaiminhoPhrases[category];
    return phrases[Math.floor(Math.random() * phrases.length)];
}

module.exports = { getJaiminhoPhrase };