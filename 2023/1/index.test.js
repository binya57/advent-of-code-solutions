const { getLineCalibrationValue, sumLinesCalibrationValues } = require('./index.js');


const datasets = [
    //#part1 example
    {
        data: [
            ['1abc2', '12'],
            ['pqr3stu8vwx', '38'],
            ['a1b2c3d4e5f', '15'],
            ['treb7uchet', '77'],
        ],
        sum: 142
    },
    //#part2 example
    {
        data: [
            ['two1nine', '29'],
            ['eightwothree', '83'],
            ['abcone2threexyz', '13'],
            ['xtwone3four', '24'],
            ['4nineeightseven2', '42'],
            ['zoneight234', '14'],
            ['7pqrstsixteen', '76'],
        ],
        sum: 281
    },
    // # overlapping words:
    {
        data: [
            ['twone', '21'],
            ['twoneight', '28']
        ],
        sum: 49
    }
]

describe('tesing single lines calibration values:', () => {
    datasets.forEach((dataset, datasetIndex) => {
        describe('testing lines dataset ' + datasetIndex, () => {
            dataset.data.forEach(
                ([line, expectedResult], lineIndex) =>
                    test('testing line ' + lineIndex, () => {
                        expect(getLineCalibrationValue(line)).toEqual(expectedResult);
                    })
            )
        })
    })
})

describe('testing sum all line calibarationValues', () => {
    datasets.forEach((dataset, datasetIndex) => {
        test('testing sum dataset ' + datasetIndex, () => {
            const inputString = dataset.data.map(([line]) => line).join('\n')
            const testResult = sumLinesCalibrationValues(inputString);
            const expectedResult = dataset.data.reduce((sum, [, originalResult]) => sum + (+originalResult), 0);
            expect(testResult).toEqual(expectedResult);
        })
    })
})

// describe('actual solution #part 2', () => {
//     test('solution result:', () => {
//         const linesStr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString('utf-8');
//         const solutionResult = sumLinesCalibrationValues(linesStr);
//         console.log(solutionResult);
//     })
// })
