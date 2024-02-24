const { getInputLines, readInputAsString } = require('./helper');

test('get input lines', () => {
    expect(getInputLines('abc\nabc\n')).toEqual(['abc', 'abc']);
})

test('read input file', () => {
    const res = readInputAsString(__dirname);
    expect(res).toEqual('testtest');
});