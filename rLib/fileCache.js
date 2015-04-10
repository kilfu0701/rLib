const {Ci,Cu} = require("chrome");
Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");

let { Object } = require('./util/Object');

function writeToFile(filePath, dataString) {
    filePath = filePath || 'resources/' + self.name + '/data/cached/scout.bundle.js';

    AddonManager.getAddonByID(self.id, function(addon) {
        //console.log(addon.getResourceURI().QueryInterface(Ci.nsIFileURL).file);
        //console.log(addon.getResourceURI("install.rdf").spec);

        let uri = addon.getResourceURI(filePath);
        //console.log(uri.QueryInterface(Ci.nsIFileURL).spec);

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
    });
}

var fileCache = function(options) {
    let default_options = {
    };

    this.options = Object.extend(default_options, options);
};



fileCache.prototype.extend = function(key, fn) {
    var self = this;

    this[key] = function() {
        fn.apply(self, arguments);
    };
};



exports.fileCache = fileCache;
