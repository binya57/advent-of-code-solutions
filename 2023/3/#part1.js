//@ts-check
/**
 * @typedef TNumberMatch
 * @property {number} value
 * @property {number} startIndex
 * @property {number} length
 */


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
 * @param {number} index 
 */
function getAdjacentIndices(rows, row, index) {
    return (
        [
            rows[row]?.[index + 1], // next in row
            rows[row - 1]?.[index + 1], // topRight
            rows[row + 1]?.[index + 1], // bottomRight
            rows[row]?.[index - 1], // prev in row
            rows[row - 1]?.[index - 1], // topLeft
            rows[row + 1]?.[index - 1], // bottomLeft
            rows[row - 1]?.[index], // top
            rows[row + 1]?.[index], // bottom
        ].filter(Boolean)
    )
}

/**
 * 
 * @param {string[]} matrix 
 */
function getPartNumbers(matrix) {
    let partNumbers = [];
    const numbersIndices = getNumbersIndices(matrix);
    numbersIndices.forEach((row, index) => {
        row.forEach(numberMatch => {
            const { value, startIndex, length } = numberMatch;
            let isPartNumber = false;
            for (let i = startIndex; i < startIndex + length; i++) {
                const adjacent = getAdjacentIndices(matrix, index, i);
                const hasAdjacentSymbol = adjacent.some(value => /[^\d\.]+/g.test(value))
                if (adjacent.some(char => !isNaN(+char))) { // testing only
                    throw new Error("has adjacent number");
                }
                if (hasAdjacentSymbol) {
                    isPartNumber = true;
                    break;
                }

            }
            if (isPartNumber) {
                partNumbers.push(value);
            }

        })
    })

    return partNumbers;

}

module.exports = {
    getIndices: getNumbersIndices,
    getAdjacentIndices,
    getPartNumbers
}