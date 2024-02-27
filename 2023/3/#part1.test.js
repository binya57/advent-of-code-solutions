//@ts-check
const { getNumbersIndices, getAdjacentIndices, getPartNumbers, sumPartNumbers } = require("./#part1")

describe('it should return all numbers in a string:', () => {
    const dataset = /**@type {const} */ ([
        ["467..114..", [
            { value: 467, startIndex: 0, length: 3 },
            { value: 114, startIndex: 5, length: 3 }
        ]],
        ["...*......", [
        ]],
        ["..35..633.", [
            { value: 35, startIndex: 2, length: 2 },
            { value: 633, startIndex: 6, length: 3 }
        ]],
        ["......#...", [
        ]],
        ["617*......", [
            { value: 617, startIndex: 0, length: 3 }
        ]],
        [".....+.58.", [
            { value: 58, startIndex: 7, length: 2 }
        ]],
        ["..592.....", [
            { value: 592, startIndex: 2, length: 3 }
        ]],
        ["......755.", [
            { value: 755, startIndex: 6, length: 3 }
        ]],
        ["...$.*....", [
        ]],
        [".664.598..", [
            { value: 664, startIndex: 1, length: 3 },
            { value: 598, startIndex: 5, length: 3 }
        ]
        ]
    ])

    dataset.forEach(([row, numbersIndices], index) => {
        test(`row: ${index}`, () => {
            expect(getNumbersIndices(row)).toEqual(numbersIndices);
        })
    })
})

describe('it should get adjacent cells of a number match:', () => {
    const datasets = [
        {
            data: [
                '.*/',
                '-1+',
                '.$#'
            ],
            matchInfo: { row: 1, value: 1, startIndex: 1, length: 1 },
            adjacent: ['.', '*', '/', '-', '+', '.', '$', '#',]
        },
        {
            data: [
                '.-123+.',
                '.*.../.',
                '.$...#.'
            ],
            matchInfo: { row: 0, value: 123, startIndex: 2, length: 3 },
            adjacent: ['-', '+', '*', '.', '.', '.', '/']
        }
    ]

    datasets.forEach(({ data, matchInfo, adjacent }, index) => {
        test(`dataset: ${index}`, () => {
            expect(getAdjacentIndices(data, matchInfo.row, matchInfo.startIndex, matchInfo.length).sort()).toEqual(adjacent.sort());
        })
    })
})

describe('get part numbers ', () => {
})

describe('sum part numbers', () => {
    test('suite 1', () => {

        expect(sumPartNumbers(
            [
                '467..114..',
                '...*......',
                '..35..633.',
                '......#...',
                '617*......',
                '.....+.58.',
                '..592.....',
                '......755.',
                '...$.*....',
                '.664.598..',
            ]
        )).toEqual(
            467 + 35 + 633 + 617 + 592 + 755 + 664 + 598
        )
    })
    test('suite 2', () => {

        expect(sumPartNumbers(
            [
                '.......497...........................747...923...128..................227..903........502.....664...........................................',
                '633........765..............250.......+....................443.............*.........+.................960........668.......................',
                '...*741...........=..........=....203......266.263...250*....=...402....543..-....................*..........575....................13.....',
            ]
        )).toEqual(
            747 + 903 + 502 + 633 + 250 + 443 + 741 + 250 + 543
        )
    })
})
