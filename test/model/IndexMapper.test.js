const { IndexMapper } = require('./model');

describe('IndexMapper', function () {

    test('should instanciate', function () {
        expect(() => new IndexMapper()).not.toThrow();
    });

});