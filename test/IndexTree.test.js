const { IndexTree } = require('../src/model');

describe('IndexTree', function () {

    test('should instanciate with a positive integer', function () {
        expect(() => new IndexTree()).not.toThrow();
        expect(() => new IndexTree(1)).not.toThrow();
        expect(() => new IndexTree(2)).not.toThrow();
        expect(() => new IndexTree(4)).not.toThrow();
        expect(() => new IndexTree(Number.MAX_SAFE_INTEGER)).not.toThrow();
        expect(() => new IndexTree(null)).toThrow();
        expect(() => new IndexTree('')).toThrow();
        expect(() => new IndexTree(Math.PI)).toThrow();
        expect(() => new IndexTree([2])).toThrow();
    });

});