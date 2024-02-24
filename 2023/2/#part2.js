const { getColorsCountByRound } = require("./#part1");

function getMinNumOfCubes(colorsCountByRound) {
    return colorsCountByRound.reduce((minByColor, round) => {
        for (let color in round) {
            if (round[color] > minByColor[color]) {
                minByColor[color] = round[color];
            }
        }
        return minByColor;
    }, { red: 0, green: 0, blue: 0 });
}

function getPowerOfRound(roundMinCubes) {
    return Object.values(roundMinCubes).reduce((result, value) => result * value, 1)
}

function getSumOfGamesPower(gamesArr) {
    return gamesArr.reduce((sum, game) => {
        const colorsByRound = getColorsCountByRound(game);
        const minByColor = getMinNumOfCubes(colorsByRound);
        const powerOfGame = getPowerOfRound(minByColor);
        return sum + powerOfGame;
    }, 0)
}

module.exports = { getMinNumOfCubes, getSumOfGamesPower }
