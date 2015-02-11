/**
 * @description
 *      fileIO
 *
 * @usage
 *      var fileIO = require('rLib/fileIO.js').fileIO;
 *
 *      var my_file = new fileIO({
 *          dir: 'TmpD',
 *          name: 'test.txt',
 *          mode: 'w'
 *      }).open();
 *
 *      my_file.write('hello world!');
 *      my_file.close();
 *
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 */

// import addon sdk
const { pathFor } = require('sdk/system');
const path = require('sdk/fs/path');
const file = require('sdk/io/file');

// import rLib deps
var settings = require('./settings.js').settings;
var logger = require('./logger.js').logger;

// init vars
var lg = new logger({
    debug_mode: settings.debug.mode,
    prefix: '[IO]'
});


// fileIO Class
var fileIO = function(options) {
    // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O#Getting_files_in_special_directories
    this.DIR = {
        TmpD: 'TmpD',
        Desk: 'Desk'
    };

    this.isOpened = false;
    this.filename = '';
    this.worker = undefined;

    // merge options.
    var default_options = {
        debug_mode: true,
        prefix: '[Default]',
        dir: this.DIR.TmpD,
        mode: 'r',
        filename: 'test.txt'
    };

    this.options = options || {};
    for(var k in default_options) {
        if(typeof(this.options[k]) != typeof(default_options[k])) {
            this.options[k] = default_options[k];
        }
    }

    return this;
};

fileIO.prototype.open = function() {
    this.filename = path.join(pathFor(this.options.dir), this.options.filename);
    this.worker = file.open(this.filename, this.options.mode);

    lg.log('filename =', this.filename);

    return this;
};

fileIO.prototype.write = function(str) {
    lg.log('write', str);

    if(this.worker) {
        this.worker.write(str);
    }
};

fileIO.prototype.close = function() {
    lg.log('close');

    if(this.worker) {
        this.worker.close();
        this.worker = undefined;
        this.filename = undefined;
    }
};

fileIO.prototype.read = function() {
    lg.log('read');

    var str = this.worker.read();

    return str;
};


exports.fileIO = fileIO;
