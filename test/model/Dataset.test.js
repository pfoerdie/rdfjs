const { Dataset } = require('./model');

describe('Dataset', function () {

    test('should instanciate', function () {
        expect(() => new Dataset()).not.toThrow();
    });

});