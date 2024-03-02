//@ts-check

const { getInputLines, readInputAsString } = require("../../lib/helper");

/**
 * 
 * @param {string} card 
 */
function readCardData(card) {
    return card
        .split(':')[1]
        .split('|')
        .map(
            str => str.split(' ').filter(char => char && char !== ' ').map(Number)
        );
}

/**
 * 
 * @param {number[]} winning 
 * @param {number[]} owned 
 */
function sumCardPoints(winning, owned) {
    return owned.reduce((sum, value) => {
        const isWinning = winning.find(number => number === value);
        if (!isWinning) return sum;
        if (sum === 0) {
            return sum + 1;
        }
        return sum * 2;
    }, 0)
}

/**
 * 
 * @param {string[]} cards 
 */
function sumAllCardsPoints(cards) {
    return cards.reduce((sum, card) => {
        const [winning, owned] = readCardData(card);
        return sum + sumCardPoints(winning, owned);
    }, 0);
}

function run() {
    const input = getInputLines(readInputAsString(__dirname));
    console.log(sumAllCardsPoints(input));
}



module.exports = {
    readCardData,
    sumCardPoints,
    sumAllCardsPoints
}