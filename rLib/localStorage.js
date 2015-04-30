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
 *      ls.clear();
 *
 *      // get all data
 *      var data = ls.$data;
 *
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 */
'use strict';

const ss = require('sdk/simple-storage');
const { logger } = require('./logger');
const { settings } = require('./settings');
let lg = new logger({debug_mode: settings.debug.mode, prefix: '[LS]'});

let o = {
    getData(key) {
        lg.log('rLib/localStorage::getData =', key, ss.storage[key]);
        return ss.storage[key];
    },

    setData(key, val) {
        lg.log('rLib/localStorage::setData =', key, val);
        ss.storage[key] = val;
    },

    deleteData(key) {
        lg.log('rLib/localStorage::deleteData =', key);
        delete ss.storage[key];
    },

    updateData(key, val) {
        lg.log('rLib/localStorage::updateData =', key, val);
        ss.storage[key] = val;
    },

    clear() {
        for(let k in ss.storage) {
            delete ss.storage[k];
        }
    }
};

exports.get = o.getData;
exports.set = o.setData;
exports.delete = o.deleteData;
exports.update = o.updateData;
exports.clear = o.clear;
exports.$data = ss.storage;
