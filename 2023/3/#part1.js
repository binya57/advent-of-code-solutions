//@ts-check
/**
 * @typedef TNumberMatch
 * @property {number} value
 * @property {number} startIndex
 * @property {number} length
 */


/**
 * 
 * @param {string[]} matrix 
 * @return {TNumberMatch[][]}
 */
function getIndices(matrix) {
    return matrix.reduce(
        (/**@type {TNumberMatch[][]} */indices, row) => {
            indices.push([]);
            const numbersMatches = [...row.join('').matchAll(/\d+/g)];
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
 * @param {string[]} matrix 
 * @param {number} row 
 * @param {number} index 
 */
function getAdjacentIndices(matrix, row, index) {
    return (
        [
            matrix[row][index + 1], // next in row
            matrix[row - 1][index + 1], // topRight
            matrix[row + 1][index + 1], // bottomRight
            matrix[row][index - 1], // prev in row
            matrix[row - 1][index - 1], // topLeft
            matrix[row + 1][index - 1], // bottomLeft
            matrix[row - 1][index], // top
            matrix[row + 1][index], // bottom
        ].filter(Boolean)
    )
}

/**
 * 
 * @param {string[]} matrix 
 */
function getPartNumbers(matrix) {
    let partNumbers = [];
    const numbersIndices = getIndices(matrix);
    numbersIndices.forEach((row, index) => {
        row.forEach(numberMatch => {
            const { value, startIndex, length } = numberMatch;
            let isPartNumber = false;
            for (let i = startIndex; i < startIndex + length - 1; i++) {
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
    getIndices,
    getAdjacentIndices,
    getPartNumbers
}