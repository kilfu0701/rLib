'use strict';

console.log('------ rLib.js');

const { Cc, Ci, Cu, components } = require('chrome');
const { Loader } = require('toolkit/loader');



Cu.import("resource://gre/modules/AddonManager.jsm");
Cu.import("resource://gre/modules/FileUtils.jsm");
const self = require('sdk/self');
console.log('--self', self);
let filePath = 'resources/' + self.name + '/data/cached/scout.bundle.js';

AddonManager.getAddonByID(self.id, function(addon) {
    console.log('--- addon', addon);
});



let rLib = {
    Import: (...args) => {
console.log('=== Import');
        let libs = (args[0].constructor.name !== 'Array') ? [args[0]] : args[0];

        let options = {};
        for(let val of libs) {
            options[val] = console;
        }

        let loader = Loader({
            globals: options
        });

console.log('===', options);
    }
};

exports.rLib = rLib;
