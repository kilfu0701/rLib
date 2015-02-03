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
var settings = require('./settings.js');
var lg = new logger({debug_mode: settings.debug.mode, prefix: '[LS]'});

function getData(key) {
    lg.log('rLib/localStorage::getData =', key, ss.storage[key]);

    return ss.storage[key];
};

function setData(key, val) {
    lg.log('rLib/localStorage::setData =', key, val);

    ss.storage[key] = val;
};

function deleteData(key) {
    lg.log('rLib/localStorage::deleteData =', key);

    delete ss.storage[key];
};

function updateData(key, val) {
    lg.log('rLib/localStorage::updateData =', key, val);

    ss.storage[key] = val;
};


exports.get = getData;
exports.set = setData;
exports.delete = deleteData;
exports.update = updateData;
