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
    const numberOfWinningNumbers = countCardsWinningNumbers(winning, owned);
    if (numberOfWinningNumbers === 0) return 0;
    return 2 ** (numberOfWinningNumbers - 1)
}

/**
 * 
 * @param {number[]} winning 
 * @param {number[]} owned 
 */
function countCardsWinningNumbers(winning, owned) {
    return owned.reduce((winningCount, number) => {
        if (isWinning(number, winning)) {
            return winningCount + 1;
        }
        return winningCount;
    }, 0)
}


/**
 *
 * @param {any} value
 * @param {Array<number>} winning 
 * @return {boolean}
 */

function isWinning(value, winning) {
    return !!winning.find(number => number === value);
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
    sumAllCardsPoints,
    isWinning,
    countCardsWinningNumbers
}