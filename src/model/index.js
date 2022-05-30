const
    util = require('@pfoerdie/utility'),
    model = exports;

model.IndexTree = require('./IndexTree');
model.IndexMapper = require('./IndexMapper');
model.Dataset = require('./Dataset');

util.prop.lock.all(exports);