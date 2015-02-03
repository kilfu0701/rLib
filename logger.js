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
var logger = function(options) {
    // merge options.
    var default_options = {
        debug_mode: true,
        prefix: '[Default]'
    };

    this.options = options || {};
    for(var k in default_options) {
        if(typeof(this.options[k]) != typeof(default_options[k])) {
            this.options[k] = default_options[k];
        }
    }
};

logger.prototype.log = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        console.log.apply(console, r);
    }
};

logger.prototype.info = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        console.info.apply(console, r);
    }
};

logger.prototype.warn = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        console.warn.apply(console, r);
    }
};

logger.prototype.error = function() {
    if(this.options.debug_mode) {
        var r = Array.prototype.slice.call(arguments);
        r.unshift(this.options.prefix);
        console.error.apply(console, r);
    }
};


// for FF module
if(typeof exports !== 'undefined') {
    exports.logger = logger;
};



