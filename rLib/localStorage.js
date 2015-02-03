/**
 * @description
 *      Use Firefox localStorage(simple-storage) in extension.
 *
 * @usage
 *      var ls = require('rLib/localStorage.js');
 *
 *      ls.set('myData', 'hello');
 *      ls.get('myData');
 *      ls.delete('myData');
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 */
var ss = require('sdk/simple-storage');

function getData(key) {
    return ss.storage[key];
};

function setData(key, val) {
    ss.storage[key] = val;
};

function deleteData(key) {
    delete ss.storage[key];
};

function updateData(key, val) {
    ss.storage[key] = val;
};


exports.get = getData;
exports.set = setData;
exports.delete = deleteData;
exports.update = updateData;
