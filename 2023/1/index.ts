const NUMBERS_NAME_MAP = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};

function getLineCalibrationValue(line = '') {
    const regexStr = `(?=(${Object.keys(NUMBERS_NAME_MAP).join('|')}|\\d))`; // positive lookahead to get all matches for overlapping words
    const matches = Array.from(line.matchAll(new RegExp(regexStr, 'gi')));
    if (!matches?.length) {
        throw new Error(getLineCalibrationValue.name + ' no matches found in line: ' + line)
    }
    const toNumber = (match: string) => NUMBERS_NAME_MAP[match as keyof typeof NUMBERS_NAME_MAP] ?? match;
    const result = `${toNumber(matches[0][1])}${toNumber(matches.at(-1)![1])}`;
    return result;
}

function sumLinesCalibrationValues(linesStr = '') {
    const lines = linesStr.split('\n').filter(Boolean); // split input on line breaks removing last empty line break;
    const sum = lines.reduce((prevSum, line) => {
        return prevSum + (+getLineCalibrationValue(line));
    }, 0);
    return (sum);
}
// logging actual solution:
const fs = require('fs');
const path = require('path');
const linesStr = fs.readFileSync(path.join(__dirname, 'input.txt')).toString('utf-8');
const solutionResult = sumLinesCalibrationValues(linesStr);
console.log('input solution result: ' + solutionResult);

export {
    getLineCalibrationValue,
    sumLinesCalibrationValues
}