function getInputLines(inputStr = "") {
    return inputStr.replaceAll('\r', '').split('\n').filter(Boolean);
}

function readInputAsString(dirname) {
    const fs = require('fs');
    const path = require('path');
    const linesStr = fs.readFileSync(path.join(dirname, 'input.txt')).toString('utf-8');
    return linesStr;
}

module.exports = {
    getInputLines,
    readInputAsString
}