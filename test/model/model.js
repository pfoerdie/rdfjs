const model = module.exports = require('../../src/model');

const tmp = new model.NamedNode('ex:test');
console.log(tmp);
console.log(tmp.toJSON());

const tmp2 = new model.Literal('Hello World!', 'en', new model.NamedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#langString'));
console.log(tmp2);
console.log(tmp2.toString());