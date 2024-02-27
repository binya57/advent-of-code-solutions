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
    const numbersMatches = [...row.matchAll(/\d+/g)];
    return numbersMatches.map((match) => {
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
 * @param {number} length
 */

function getAdjacentIndices(rows, row, start, length) {
    /**
     * @type {string[]}
     */
    const indices = [];
    for (let i = start - 1; i < start + length + 1; i++) {
        indices.push(rows[row - 1]?.[i], rows[row + 1]?.[i]);
    }
    return [
        rows[row]?.[start - 1], // prevInRow,
        rows[row]?.[start + length], // nextInRow        
    ].concat(indices).filter(Boolean);
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
    sumPartNumbers
}