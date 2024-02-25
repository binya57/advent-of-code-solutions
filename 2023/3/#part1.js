//@ts-check


/**
 * 
 * @param {string[]} matrix 
 * @return {[number, number, number][][]}
 */
function getIndices(matrix) {
    return matrix.reduce(
        (/**@type {[number, number, number][][]} */indices, row) => {
            indices.push([]);
            const numbersMatches = [...row.matchAll(/\d+/g)];
            numbersMatches.map((match) => {
                const [number] = match;
                const index = match.index || 0;
                const matchLength = number.length;
                indices[indices.length - 1].push([+number, index, matchLength]);
            })
            return indices;
        }, [])
}

/**
 * @typedef {{value: number, }} TNumberMatch
 */

/**
 * 
 * @param {*} matrix 
 * @param {*} index 
 */
function getAdjacentIndices(matrix, index) {

}

module.exports = {
    getIndices,
}