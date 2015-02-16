/**
 * @usage
 *  Step 1: Put 'ws.html' in '...data/html/'
 *
 *     <!doctype html>
 *     <html>
 *     <head>
 *         <meta charset="UTF-8">
 *         <script type="text/javascript" src="../js/lib/jquery-1.10.1.min.js"></script>
 *         <script type="text/javascript" src="../js/ws.js"></script>
 *     </head>
 *     <body>
 *     </body>
 *     </html>
 *
 *  Step 2: Include lib in 'main.js'
 *
 *      var wssObject = require('rLib/wssObject').wssObject;
 *
 */
// wss Object
var pageWorker = require('sdk/page-worker');
var self = require('sdk/self');

var wssObject = (function(pageWorker, self) {
    var _connected = false;
    var _timeout = 5;

    var _onCallMethod = function() {
        console.log('default _callMethod', arguments);
    };

    var _pw = pageWorker.Page({
        contentURL: self.data.url('html/ws.html')
    });

    _pw.port.on('callMethod', _onCallMethod);

    return {
        send: _pw.port.emit,
        receive: _onCallMethod
    };

})(pageWorker, self);


exports.wssObject = wssObject;
