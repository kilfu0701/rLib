var Request = require('sdk/request').Request;
var timers = require('sdk/timers');
var ls = require('./localStorage.js');
var logger = require('./logger.js').logger;
var settings = require('./settings.js').settings;
var lg = new logger({debug_mode: settings.debug.mode, prefix: '[PS]'});

var port_range = {
    min: 49152,
    max: 59153
};
var previous_port = {
    https: 0,
    wss: 0
};
var max_requests = 1000;
var current_requests = 0;
var finished = false;


function scan(url, cb) {
    url = url || 'https://localhost:49155/getTowerInfo?_=';

    lg.log('scan() url =', url);

    Request({
        url: url,
        onComplete: function (response) {
            lg.log('scan() resp =', response);

            if(typeof cb === 'function') {
                cb(response);
            }
        },
        timeout: 30
    }).get();
};

function autoScan(cb) {
    previous_port = ls.get('port_number');
    lg.log('autoScan() previous_port =', previous_port);

    var current_port = port_range.min;
    var zt = timers.setInterval(function() {
        if(finished) {
            lg.log('autoScan() finished');
            timers.clearTimeout(zt);
            return ;
        }

        if(current_requests < max_requests) {
            current_requests++;

            //if(current_port > port_range.max) {
            if(current_port > 49180) {
                timers.clearTimeout(zt);
                return ;
            }

            var url = 'https://localhost:' + current_port + '/getTowerInfo?_=';
            lg.log('autoScan() url =', url);

            Request({
                url: url,
                onComplete: function (response) {
                    current_requests--;
                    lg.log('autoScan() resp =', response.json, response.headers);

                    if(typeof cb === 'function') {
                        if(response.json) {
                            lg.log('autoScan() response.json =', response.json);

                            if(response.json.service === 'DP_TOWER' && response.json.port_number) {
                                finished = true;
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
            lg.log('autoScan() max req reach...');
        }
    }, 5);
};


exports.scan = scan;
exports.autoScan = autoScan;
