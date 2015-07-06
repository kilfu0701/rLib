let { Request } = require('sdk/request');
let timers = require('sdk/timers');
let ls = require('./localStorage');
const { logger } = require('./logger');
const { settings } = require('./settings');

var lg = new logger({debug_mode: settings.debug.mode, prefix: '[PS]'});

var port_range = {
    min: 49152,
    max: 49202
};
var previous_port = {
    https: 0,
    wss: 0
};
var max_requests = 1000;
var current_requests = 0;
var finished = false;
var timeForReScan = 30 * 1000;
var counter = 0;

function scan(url, cb) {
    url = url || 'https://localhost:49155/getTowerInfo?_=';

    lg.log('[scan] url =', url);

    Request({
        url: url,
        onComplete: function (response) {
            lg.log('[scan] resp =', response);

            if(typeof cb === 'function') {
                cb(response);
            }
        },
        timeout: 3000
    }).get();
};

function autoScan(cb) {
    finished = false;
    isScanning = true;

    previous_port = ls.get('port_number');
    lg.log('[autoScan] previous_port =', previous_port);

    var current_port = port_range.min;
    var zt = timers.setInterval(function() {
        if(finished) {
            lg.log('[autoScan] finished');
            isScanning = false;
            timers.clearTimeout(zt);
            return ;
        }

        if(current_requests < max_requests) {
            current_requests++;

            if(current_port > port_range.max) {
                // all port scanned.
                timers.clearTimeout(zt);
                isScanning = false;

                if(!finished) {
                    lg.log('[autoScan] wait ', timeForReScan / 1000, ' sec for next round ...');
                    counter++;
                    _fullScanCountCB(counter);
                    timers.setTimeout(function(){ autoScan(cb); }, timeForReScan);
                }

                return ;
            }

            var url = 'https://localhost:' + current_port + '/api/getTowerInfo?_=';
            lg.log('[autoScan] url =', url);

            Request({
                url: url,
                onComplete: function (response) {
                    current_requests--;
                    lg.log('[autoScan] resp =', response.json, response.headers);

                    if(typeof cb === 'function') {
                        if(response.json) {
                            lg.log('[autoScan] response.json =', response.json);

                            if(response.json.returncode === '0'
                                && response.json.service === 'DP_TOWER'
                                && response.json.port_number
                            ) {
                                finished = true;
                                counter = 0;
                                // write into localStorage
                                ls.set('port_number', response.json.port_number);
                                
                                cb(response.json);
                            } else {
                                //lg.log('autoScan() resp format not correct');
                            }
                        }
                    }
                },
                timeout: 1000
            }).get();

            current_port++;
        } else {
            lg.log('[autoScan] max req reach...');
        }
    }, 20);
}

function setTimeForReScan(t) {
    timeForReScan = t;
}

var _fullScanCountCB = function(i) {};
function fullScanCountCB(func) {
    _fullScanCountCB = func;
}

exports.scan = scan;
exports.autoScan = autoScan;
exports.setTimeForReScan = setTimeForReScan;
exports.fullScanCountCB = fullScanCountCB;
