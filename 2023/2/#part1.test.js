const { getColorsCountByRound, getGameId, isPossible, sumPossibleGamesIds } = require('./#part1');

const games = /**@type {const}*/([
    ['Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green', {
        id: 1,
        isPossible: true,
        colorsCountByRound: [
            { blue: 3, red: 4 },
            { red: 1, green: 2, blue: 6 },
            { green: 2 },
        ],
        maxByColor: {
            red: 4,
            green: 2,
            blue: 6
        },
        power: 48
    }],
    ['Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue', {
        id: 2, isPossible: true, colorsCountByRound: [
            { green: 2, blue: 1 },
            { red: 1, green: 3, blue: 4 },
            { green: 1, blue: 1 },
        ],
        maxByColor: {
            red: 1,
            green: 3,
            blue: 4
        },
        power: 12
    }],
    ['Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red', {
        id: 3, isPossible: false, colorsCountByRound: [
            { red: 20, green: 8, blue: 6 },
            { red: 4, green: 13, blue: 5 },
            { red: 1, green: 5 },
        ],
        maxByColor: {
            red: 20,
            green: 13,
            blue: 6
        },
        power: 1560
    }],
    ['Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red', {
        id: 4, isPossible: false, colorsCountByRound: [
            { red: 3, green: 1, blue: 6 },
            { red: 6, green: 3 },
            { red: 14, green: 3, blue: 15 },
        ],
        maxByColor: {
            red: 14,
            green: 3,
            blue: 15
        },
        power: 630
    }],
    ['Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green', {
        id: 5, isPossible: true, colorsCountByRound: [
            { red: 6, green: 3, blue: 1 },
            { red: 1, green: 2, blue: 2 },
        ],
        maxByColor: {
            red: 6,
            green: 3,
            blue: 2
        },
        power: 36
    }],
])

describe('getting game id:', () => {
    games.forEach(([gameLine, expected]) => {
        test('should get id correctly', () => {
            expect(getGameId(gameLine)).toEqual(expected.id);
        })
    })
})

describe('get colors by round', () => {
    games.forEach(([gameLine, expected]) => {
        test('should get colors correctly', () => {
            expect(getColorsCountByRound(gameLine)).toEqual(expected.colorsCountByRound);
        })
    })
})

describe('test possability', () => {
    games.forEach(([gameLine, expected]) => {
        const colorsCountByRound = getColorsCountByRound(gameLine);
        test(`game #${getGameId(gameLine)} should be ${expected.isPossible ? 'possible' : 'impossible'}`, () => {
            expect(isPossible(colorsCountByRound)).toEqual(expected.isPossible);
        });
    })
});

test('sum of possible games', () => {
    const expectedResult = games.filter(([, expected]) => expected.isPossible).reduce((sum, [gameLine]) => sum + getGameId(gameLine), 0);
    const testResult = sumPossibleGamesIds(games.map(([line]) => line).join('\n'));
    expect(testResult).toEqual(expectedResult);
})

module.exports = { games }