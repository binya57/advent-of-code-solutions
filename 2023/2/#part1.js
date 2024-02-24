const { getInputLines, readInputAsString } = require("../../lib/helper");

const GAME_CONFIG = {
    red: 12,
    blue: 14,
    green: 13
};


function getGameId(gameLine = '') {
    const regex = /\d+/; // first digits in line;
    return +gameLine.match(regex)[0];
}

function getColorsCountByRound(line) {
    const gameDataByRound = [];
    const gameDataStr = line.split(':')[1].trim();
    const roundsData = gameDataStr.split('; ');
    const roundsColorsData = roundsData.map(gameData => gameData.split(', '));
    roundsColorsData.forEach((round) => {
        const roundColorsData = {};
        round.forEach(colorData => {
            const [count, color] = colorData.split(' ');
            roundColorsData[color] = +count;
        })
        gameDataByRound.push(roundColorsData);

    });
    return gameDataByRound;
}

function isPossible(colorsCountByRound) {
    return colorsCountByRound.every(roundColors => {
        return Object.keys(roundColors).every(color => GAME_CONFIG[color] >= roundColors[color]);
    })
}

function sumPossibleGamesIds(inputStr = '') {
    return getInputLines(inputStr).reduce((sum, line) => {
        const colorsCountByRound = getColorsCountByRound(line);
        if (isPossible(colorsCountByRound)) {
            return sum + getGameId(line)
        }
        return sum;
    }, 0)
}

const linesStr = readInputAsString(__dirname);
const solutionResult = sumPossibleGamesIds(linesStr);
console.log('input solution result: ' + solutionResult);


module.exports = {
    getGameId,
    getColorsCountByRound,
    isPossible,
    sumPossibleGamesIds
}