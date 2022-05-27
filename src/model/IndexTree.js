const
    util = require('../util'),
    model = require('../model');

/**
 * @template {number} [Depth = 1]
 * @template {string | number} [Key = string | number]
 * @template {any} [Value = undefined]
 */
class IndexTree {

    #depth = 1;
    #size = 0;
    #entry = Object.create(null);

    #assertValidDepth(depth) {
        if (!util.isPositiveInteger(depth)) {
            const message = 'expected the depth to be an integer > 0';
            const error = new Error(message);
            Error.captureStackTrace(error, this.#assertValidDepth);
            throw error;
        }
    }

    #assertValidKeys(keys) {
        const passed = (keys.length === this.#depth);
        if (keys.length !== this.#depth) {
            const message = 'expected to get ' + this.#depth + (this.#depth === 1 && ' key' || ' keys')
                + ' but got ' + (keys.length < this.#depth && 'only ' || '') + keys.length;
            const error = new Error(message);
            Error.captureStackTrace(error, this.#assertValidKeys);
            throw error;
        }
    }

    /**
     * An IndexTree that can store entries of key value pairs.
     * The keys must be numbers or strings and the values can be anything.
     * @param {Depth} depth The number of keys necessary for this IndexTree instance.
     */
    constructor(depth = this.#depth) {
        this.#assertValidDepth(depth);
        this.#depth = depth;
    }

    /**
     * The number of keys that are necessary for each entry.
     * @type {Depth}
     */
    get depth() {
        return this.#depth;
    }

    /**
     * The number of entries in the IndexTree.
     * @type {number}
     */
    get size() {
        return this.#size;
    }

    /**
     * Detect whether the keys already exist in the IndexTree.
     * @param {...Key} keys The keys to check their existence.
     * @returns {boolean} The existence of the keys in the IndexTree.
     */
    has(...keys) {
        this.#assertValidKeys(keys);

        let entry = this.#entry;
        for (let key in keys) {
            if (!(key in entry)) return false;
            entry = entry[key];
        }
        return true;
    }

    /**
     * Get the value for specific keys in the IndexTree.
     * @param {...Key} keys The keys to get their value.
     * @returns {Value} The value for the keys in the IndexTree.
     */
    get(...keys) {
        this.#assertValidKeys(keys);

        let entry = this.#entry;
        for (let key in keys) {
            if (!(key in entry)) return;
            entry = entry[key];
        }
        return entry;
    }

    /**
     * Add a value to the IndexTree without overwriting it.
     * @param {...Key} keys The keys to insert the value at.
     * @param {Value} value The value to insert at those keys, if not already existing.
     * @returns {boolean} True if the keys have not existed yet and have been added.
     */
    add(...keys /*, value*/) {
        const value = keys.pop();
        this.#assertValidKeys(keys);

        const lastKey = keys.shift();
        let entry = this.#entry;
        for (let key in keys) {
            if (!(key in entry)) entry[key] = Object.create(null);
            entry = entry[key];
        }

        if (lastKey in entry) return false;
        entry[lastKey] = value;
        this.#size++;
        return true;
    }

    /**
     * Set a value in the IndexTree and overwrite it if necessary.
     * @param {...Key} keys The keys to insert the value at.
     * @param {Value} value The value to insert at those keys, override if necessary.
     * @returns {boolean} True if the keys already existed and had to be overriden.
     */
    set(...keys /*, value*/) {
        const value = keys.pop();
        this.#assertValidKeys(keys);

        const lastKey = keys.shift();
        let entry = this.#entry;
        for (let key in keys) {
            if (!(key in entry)) entry[key] = Object.create(null);
            entry = entry[key];
        }

        const existed = (lastKey in entry);
        entry[lastKey] = value;
        if (!existed) this.#size++;
        return existed;
    }

    /**
     * Delete the keys at their value in the IndexTree.
     * @param {...Key} keys The keys to delete the value at.
     * @returns {boolean} True if the keys existed and the value had been deleted.
     */
    delete(...keys) {
        this.#assertValidKeys(keys);

        const chain = [];
        let entry = this.#entry;
        for (let key in keys) {
            if (!(key in entry)) return false;
            chain.unshift([entry, key]);
            entry = entry[key];
        }

        this.#size--;
        cleanup: for (let [entry, key] of chain) {
            delete entry[key];
            for (let otherKey in entry) break cleanup;
        }
        return true;
    }

    /**
     * Iterate over the entries of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<[Value, ...Key]>} An iterator over the matching entries, the value followed by the keys as array.
     */
    * entries(...filter) {
        // TODO
    }

    /**
     * Iterate over the keys of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<[...Key]>} An iterator over the matching keys as array.
     */
    * keys(...filter) {
        // TODO
    }

    /**
     * Iterate over the values of the IndexTree with the use of an optional filter.
     * @param {...Key} filter The filter for the keys, a null as placeholder.
     * @returns {Iterator<Value>} An iterator over the matching values.
     */
    * values(...filter) {
        // TODO
    }

}

module.exports = IndexTree;