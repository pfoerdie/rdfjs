const { IndexTree } = require('./model');

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

    test('should manipulate a tree with depth 4', function () {
        const tree = new IndexTree(4);

        expect(tree.add(1, 2, 3, 4, 'hello')).toBe(true);
        expect(tree.add('one', 'two', 'three', 'four', 'world')).toBe(true);

        expect(tree.size).toBe(2);

        expect(tree.get(1, 2, 3, 4)).toBe('hello');
        expect(tree.get('1', '2', '3', '4')).toBe('hello');
        expect(tree.get('one', 'two', 'three', 'four')).toBe('world');

        expect(() => tree.add(1, 2, 3, 'lorem')).toThrow();
        expect(() => tree.add(1, 2, 3, Symbol(), 'ipsum')).toThrow();

        expect(tree.add(1, 2, 3, 4, 'test')).toBe(false);
        expect(tree.get(1, 2, 3, 4)).not.toBe('test');
        expect(tree.set(1, 2, 3, 4, 'test')).toBe(true);
        expect(tree.get(1, 2, 3, 4)).toBe('test');

        expect(tree.set(-Infinity, Infinity, NaN, 0, 'lorem ipsum')).toBe(false);
        expect(tree.get(-Infinity, Infinity, NaN, 0)).toBe('lorem ipsum');
        expect(tree.get(-Infinity, Infinity, NaN, '0')).toBe('lorem ipsum');
        expect(tree.get(-Infinity, Infinity, 'NaN', '0')).toBe('lorem ipsum');
        expect(tree.get('-Infinity', 'Infinity', 'NaN', '0')).toBe('lorem ipsum');

        expect(tree.size).toBe(3);
        expect(tree.delete(1, '2', 3, '4')).toBe(true);
        expect(tree.delete('1', 2, '3', 4)).toBe(false);
        expect(tree.get('1', '2', '3', '4')).toBe(undefined);
        expect(tree.delete('one', 'two', 'three', 'four')).toBe(true);
        expect(tree.size).toBe(1);
    });

});