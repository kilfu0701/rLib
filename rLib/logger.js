/**
 * @description
 *      logger
 *
 * @usage
 *      var logger = require('rLib/logger.js').logger;
 *      var lg = new logger( {debug_mode: true, prefix: '[Q]'} );
 *
 *      lg.log('asd');
 *      lg.info(1, 2, {a: '345'});
 *      lg.warn('Warning');
 *      lg.error('Error Message', err);
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 */
// import rLib deps
const { fileIO } = require('./fileIO');
let { Object } = require('./util/Object');


// logger Class
var logger = function(options) {
    // merge options.
    var default_options = {
        debug_mode: true,
        prefix: '[Default]',
        toFile: false,
        toFilename: 'test.log'
    };

    this.options = Object.extend(default_options, options);

    this.io = undefined;
    if(this.options.toFile) {
        this.io = new fileIO({
            dir: 'TmpD',
            filename: this.options.toFilename,
            mode: 'a'
        }).open();
    }
};

logger.prototype.log = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        //console.log.apply(console, r);
        this._output('log', r);
    }
};

logger.prototype.info = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        //console.info.apply(console, r);
        this._output('info', r);
    }
};

logger.prototype.warn = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        //console.warn.apply(console, r);
        this._output('warn', r);
    }
};

logger.prototype.error = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        //console.error.apply(console, r);
        this._output('error', r);
    }
};

logger.prototype._time = function() {
    var d = new Date();
    var str = d.getFullYear() + "/" +
        ("00" + (d.getMonth() + 1)).slice(-2) + "/" +
        ("00" + d.getDate()).slice(-2) + " " +
        ("00" + d.getHours()).slice(-2) + ":" +
        ("00" + d.getMinutes()).slice(-2) + ":" +
        ("00" + d.getSeconds()).slice(-2);

    return str;
};

logger.prototype._output = function(x, ret) {
    if(this.options.toFile) {
        var arr = [];
        arr.push('[' + x.toUpperCase() + ']\t' + this._time() + '\t');

        for(var i in ret) {
            var _str = (typeof ret[i] === 'object') ? JSON.stringify(ret[i]) : ret[i];
            arr.push(_str);
        }

        this.io.write(arr.join(' ') + '\n');
    } else if(this.options.debug_mode) {
        console[x].apply(console, ret);
    }
};

// for FF module
if(typeof exports !== 'undefined') {
    exports.logger = logger;
};



