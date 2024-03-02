const { sumGearsRatios } = require("./#part2")

describe('sum gear ratios', () => {
    test('should sum example gear ratios correctly', () => {

        expect(sumGearsRatios(
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
        )).toEqual(467835)
    })
})