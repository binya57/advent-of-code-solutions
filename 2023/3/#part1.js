//@ts-check
/**
 * @typedef TNumberMatch
 * @property {number} value
 * @property {number} startIndex
 * @property {number} length
 */

const { readInputAsString, getInputLines } = require("../../lib/helper");


/**
 * 
 * @param {string} row 
 * @return {TNumberMatch[]}
 */
function getNumbersIndices(row) {
    return getIndices(row, /\d+/g);
}

/**
 * 
 * @param {string} row 
 * @param {RegExp} regexp 
 * @returns 
 */

function getIndices(row, regexp) {
    const matches = [...row.matchAll(regexp)];
    return matches.map((match) => {
        const [number] = match;
        const index = match.index || 0;
        const matchLength = number.length;
        return { value: +number, startIndex: index, length: matchLength }
    })
}

/**
 * 
 * @param {string[]} rows 
 * @param {number} row 
 * @param {number} start 
 * @param {number} [length = 1] length
 */

function getAdjacentIndices(rows, row, start, length = 1) {
    /**
     * @type {string[]}
     */
    const indices = [];
    if (start - 1 >= 0) {
        indices.push(rows[row][start - 1]);
    }

    if (start + length < rows[row].length) {
        indices.push(rows[row][start + length]);
    }

    for (let i = start - 1; i < start + length + 1; i++) {
        if (row - 1 >= 0 && i >= 0) {
            indices.push(rows[row - 1][i]);
        }
        if (row + 1 < rows.length && i >= 0) {
            indices.push(rows[row + 1][i]);
        }
    }
    return indices;
}


/**
 * 
 * @param {string[]} rows 
 */
function getPartNumbers(rows) {
    const numbersIndices = rows.map(row => getNumbersIndices(row));
    return numbersIndices.reduce((/**@type {number[]} */partNumbers, row, rowIndex) => {
        const partNumbersInRow = row.filter(numberMatch => {
            const { startIndex, length } = numberMatch;
            const adjacent = getAdjacentIndices(rows, rowIndex, startIndex, length);
            const hasAdjacentSymbol = adjacent.some(value => /[^\d\.]+/g.test(value))
            return hasAdjacentSymbol;
        }).map(partNumber => partNumber.value);
        return partNumbers.concat(partNumbersInRow);
    }, [])
}
/**
 * 
 * @param {string[]} rows 
 */
function sumPartNumbers(rows) {
    const partNumbers = getPartNumbers(rows)
    return partNumbers.reduce((sum, value) => sum + value, 0);
}

function run() {
    const input = getInputLines(readInputAsString(__dirname));
    console.log(sumPartNumbers(input));
}


module.exports = {
    getNumbersIndices,
    getAdjacentIndices,
    getPartNumbers,
    sumPartNumbers,
    getIndices
}