const util = exports;

util.isNull = function (value) {
    return value ?? null === null;
};

util.isPositiveInteger = function (value) {
    return Number.isSafeInteger(value) && value > 0;
};