const cryptoHash = require('./crypto-hash');

describe('cryptoHash()', () => {
    it('generates a SHA-256 hased output', () => {
        expect(cryptoHash('unkle adams original posting'))
        .toEqual('70e8b07c7d24bde47defadb8ab89cdb246518d0581e17dd6a83034ba7e3c804a');
    });
    it('produces the same hash with the same input arguments in any order', () => {
        expect(cryptoHash('one', 'two', 'three'))
        .toEqual(cryptoHash('two', 'one', 'three'));
    });
});