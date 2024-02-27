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
 * @param {string[]} rows 
 * @return {TNumberMatch[][]}
 */
function getNumbersIndices(rows) {
    return rows.reduce(
        (/**@type {TNumberMatch[][]} */indices, row) => {
            indices.push([]);
            const numbersMatches = [...row.matchAll(/\d+/g)];
            numbersMatches.map((match) => {
                const [number] = match;
                const index = match.index || 0;
                const matchLength = number.length;
                indices[indices.length - 1].push({ value: +number, startIndex: index, length: matchLength });
            })
            return indices;
        }, [])
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
    /**
     * @type {number[]}
     */
    let partNumbers = [];
    const numbersIndices = getNumbersIndices(rows);
    numbersIndices.forEach((row, rowIndex) => {
        row.forEach(numberMatch => {
            const { value, startIndex, length } = numberMatch;
            const adjacent = getAdjacentIndices(rows, rowIndex, startIndex, length);
            const hasAdjacentSymbol = adjacent.some(value => /[^\d\.]+/g.test(value))
            if (hasAdjacentSymbol) {
                partNumbers.push(value);
            }

        })
    })
    return partNumbers;
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

run();

module.exports = {
    getIndices: getNumbersIndices,
    getAdjacentIndices,
    getPartNumbers,
    sumPartNumbers
}