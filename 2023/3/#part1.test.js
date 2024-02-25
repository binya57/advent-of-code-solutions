const { getIndices } = require("./#part1")

test('get matrix indices', () => {
    expect(getIndices(
        [
            '1213asdasd123333asda'
        ])).toEqual([
            [
                1213,
                0,
                4
            ],
            [
                123333,
                10,
                6
            ]
        ])
})