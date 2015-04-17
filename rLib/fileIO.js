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

const {Cc, Ci, Cu, components} = require("chrome");
Cu.import("resource://gre/modules/NetUtil.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");

let { Object } = require('./util/Object');

// fileIO Class
var fileIO = function(options) {
    // https://developer.mozilla.org/en-US/Add-ons/Code_snippets/File_I_O#Getting_files_in_special_directories
    this.DIR = {
        TmpD: 'TmpD',
        Desk: 'Desk'
    };

    this.isOpened = false;
    this.filename = '';
    this.nsIFile = undefined; //FileUtils.getFile("TmpD", ["ttt.txt"]);

    var default_options = {
        debug_mode: true,
        prefix: '[Default]',
        dir: this.DIR.TmpD,
        mode: 'r',
        filename: 'test.txt'
    };

    this.options = Object.extend(default_options, options);

    this.permissions = {
        'r': 0x01,
        'w': 0x02,
        'w+': 0x02 | 0x20, // it will truncate file
        'a': 0x02 | 0x10,
    };

    return this;
};

fileIO.prototype.open = function() {
    this.nsIFile = FileUtils.getFile(this.options.dir, [this.options.filename]);

    var foStream = Cc["@mozilla.org/network/file-output-stream;1"].
                   createInstance(Ci.nsIFileOutputStream);

    // https://developer.mozilla.org/en-US/docs/PR_Open#Parameters
    var mode = this.permissions[this.options.mode]; 

    if(!this.nsIFile.exists()) {
        mode |= 0x08;
    }

    foStream.init(this.nsIFile, mode, 666, 0);

    this.converter = Cc["@mozilla.org/intl/converter-output-stream;1"].
                    createInstance(Ci.nsIConverterOutputStream);
    this.converter.init(foStream, 'UTF-8', 0, 0);

    return this;
};

fileIO.prototype.write = function(str) {
    this.converter.writeString(str);
};

fileIO.prototype.writeln = function(str) {
    this.converter.writeString(str + '\r\n');
};

fileIO.prototype.close = function() {
    this.converter.close();
};

/*
function writeToFile(filePath, dataString) {
    filePath = filePath || 'resources/password-manager/data/cached/scout.bundle.js';

    AddonManager.getAddonByID(self.id, function(addon) {
        //console.log('----', addon.getResourceURI().QueryInterface(Ci.nsIFileURL).file);
        //console.log('!!!', addon.getResourceURI("install.rdf").spec);

        let uri = addon.getResourceURI(filePath);
        //if (uri instanceof Ci.nsIFileURL) {
        //console.log('----------', uri.QueryInterface(Ci.nsIFileURL).spec);

        let file = uri.QueryInterface(Ci.nsIFileURL).file;
        file.initWithPath(file.path);

        let stream = FileUtils.openFileOutputStream(
                file,
                FileUtils.MODE_WRONLY
                    | FileUtils.MODE_CREATE
                    | FileUtils.MODE_TRUNCATE
            );
        let dataToWrite = dataString;
        stream.write(dataToWrite, dataToWrite.length);
        stream.close();
        //}
    });
}
*/


exports.fileIO = fileIO;
