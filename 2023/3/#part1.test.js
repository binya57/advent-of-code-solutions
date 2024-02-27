//@ts-check
const { getIndices, getAdjacentIndices, getPartNumbers } = require("./#part1")

test('get matrix indices', () => {
    expect(getIndices(
        [
            '123a123'
        ])).toEqual([
            [
                { value: 123, startIndex: 0, length: 3 },
                { value: 123, startIndex: 4, length: 3 }
            ]
        ])
})

test('get Adjacent Indices', () => {
    const test = [
        '***',
        '*5*',
        '***',

    ]
    expect(getAdjacentIndices(test, 1, 1,)).toEqual(new Array(8).fill("*"));
})

describe('get part numbers ', () => {
    const test1 = [
        '...',
        '.5.',
        '...',
    ]
    const test2 = [
        '***',
        '*5*',
        '***',
    ]

    const test3 = [
        '*..',
        '.5.',
        '...',
    ]

    const test4 = [
        '*..',
        '.5.',
        '...',
    ]

    const test5 = [
        '*..',
        '.5.',
        '..7',
    ]

    const test6 = [
        '*..',
        '...',
        '..7',
    ]

    const tests = [
        test1, test2, test3, test4
    ]

    // for (let test of tests) {
    test('test1', () => {
        expect(getPartNumbers(test1)).toEqual([]);

    })
    test('test2', () => {
        expect(getPartNumbers(test2)).toEqual([5]);

    })
    test('test3', () => {

        expect(getPartNumbers(test3)).toEqual([5]);
    })
    test('test4', () => {

        expect(getPartNumbers(test4)).toEqual([5]);
    })
    test('test5', () => {
        expect(() => getPartNumbers(test5)).toThrow("has adjacent number")

    })
    test('test5', () => {

        expect(getPartNumbers(test6)).toEqual([])
    })

    // }
})