function isSymbol(char = '') {
    return /\D/g.test(char) && char !== '.';
}

function getAdjacendCells(matrix, rowIndex, columnIndex) {
    return [
        matrix[rowIndex][columnIndex - 1],
        matrix[rowIndex][columnIndex + 1],
        matrix[rowIndex - 1][columnIndex],
        matrix[rowIndex - 1][columnIndex - 1],
        matrix[rowIndex - 1][columnIndex + 1],
        matrix[rowIndex + 1][columnIndex],
        matrix[rowIndex + 1][columnIndex - 1],
        matrix[rowIndex + 1][columnIndex + 1],
    ]
}