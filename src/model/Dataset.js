const
    util = require('@pfoerdie/utility'),
    model = require('../model');

class Dataset {

    #indexTree = new model.IndexTree(4, util.is.number.integer.nonnegative, util.is.object.null);

    // TODO

}

module.exports = Dataset;