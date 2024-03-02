//@ts-check
const { getNumbersIndices, getIndices, getAdjacentIndices } = require("./#part1");

/**
 * 
 * @param {string[]} rows 
 */
function sumGearsRatios(rows) {
    const numbers = rows.map(getNumbersIndices);
    const gears = rows.map(getGearsIndices);
    return gears.reduce((sum, row, rowIndex) => {
        row.forEach(gear => {
            const currentRowNumbers = numbers[rowIndex] ?? [];
            const prevRowNumbers = numbers[rowIndex - 1] ?? [];
            const nextRowNumbers = numbers[rowIndex + 1] ?? [];
            const adjacentNumbers = [
                ...currentRowNumbers,
                ...prevRowNumbers,
                ...nextRowNumbers,
            ].filter(number => {
                return gear.startIndex >= number.startIndex - 1 && gear.startIndex <= number.startIndex + number.length;
            })

            if (adjacentNumbers.length < 2) {
                return sum;
            }

            sum += adjacentNumbers.reduce((subSum, number) => subSum * number.value, 1);
        });
        return sum;
    }, 0)
}



/**
 * 
 * @param {string} row 
 */
function getGearsIndices(row) {
    return getIndices(row, /\*+/g);
}

module.exports = {
    sumGearsRatios
} 