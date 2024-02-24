const { getInputLines, readInputAsString } = require('../../lib/helper');
const { games } = require('./#part1.test');
const { getMinNumOfCubes, getSumOfGamesPower } = require('./#part2');

describe('test solution 2 part 2', () => {
    describe('get min cubes to make game possible', () => {
        games.forEach(([val, { maxByColor, colorsCountByRound }]) => {
            expect(getMinNumOfCubes(colorsCountByRound)).toEqual(maxByColor);
        })
    })

    test('sum power of games', () => {
        const expectedGamesPowerSum = games.reduce((sum, [, gmaeData]) => gmaeData.power + sum, 0);
        expect(getSumOfGamesPower(games.map(([gameLine]) => gameLine))).toEqual(expectedGamesPowerSum)
    })

    test('test by input', () => {
        const inputGames = getInputLines(readInputAsString(__dirname));
        expect(getSumOfGamesPower(inputGames)).toEqual(63981);
    })
})
