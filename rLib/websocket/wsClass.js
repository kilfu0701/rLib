/**
 * @usage
 *  Step 1: Put 'ws.html' in '...data/html/'
 *
 *      <!doctype html>
 *      <html>
 *      <head>
 *          <meta charset="UTF-8">
 *          <script type="text/javascript" src="../rLib/websocket/wsClass.js"></script>
 *          <script>
 *          window.onload = function() {
 *              // setup websocket connection
 *              ws = new wsClass({
 *                  url: 'wss://localhost',
 *                  port: 45678
 *              }).open();
 *
 *              // implement callback
 *              ws.onMessage = function(e) {};
 *              ws.onError = function(e) {};
 *              ws.onOpen = function(e) {
 *                  addon.port.emit('message', 'connection setup ok.');
 *              };
 *              ws.onClose = function(e) {};
 *
 *              // close web socket
 *              ws.close();
 *          };
 *          </script>
 *      </head>
 *      <body>
 *      </body>
 *      </html>
 *
 *  Step 2: Run a pageWorker in 'main.js'
 *
 *      var pageWorker = require('sdk/page-worker');
 *      var wsPage = pageWorker.Page({
 *          contentURL: self.data.url('html/ws.html'),
 *      });
 *      wsPage.port.on('message', function(message) {   });
 */

var wsClass = function(options) {
    console.log('[Firefox][WS] options =', options);

    // merge options.
    var default_options = {
        port: 45678,
        url: 'wss://localhost'
    };

    this.options = options || {};
    for(var k in default_options) {
        if(typeof(this.options[k]) != typeof(default_options[k])) {
            this.options[k] = default_options[k];
        }
    }

    this.ws = undefined;
    this.path = this.options.url + ':' + this.options.port;

    return this;
};

wsClass.prototype.open = function() {
    var _this = this;

    //var wssUrl = this.url + ''
    if(!this.ws)
        this.ws = new WebSocket(this.path);

    console.log('[Firefox][WS] open', this.path);

    this.onMessage = function(e) {};
    this.onOpen = function(e) {};
    this.onError = function(e) {};
    this.onClose = function(e) {};
    

    this.ws.onmessage = function(e) {
        _this.onMessage(e);
    };

    this.ws.onopen = function(e) {
        _this.onOpen(e);
    };

    this.ws.onerror = function(e) {
        _this.onError(e);
    };

    this.ws.onclose = function(e) {
        _this.onClose(e);
    };

    this.ws.send = this.send;


    return this;
};

wsClass.prototype.close = function() {
    console.log('[Firefox][WS] close');
    this.ws.close();
};

wsClass.prototype.onOpen = function() {
    console.log('[Firefox][WS] onOpen');
};

wsClass.prototype.onError = function(e) {
    console.log('[Firefox][WS] onError', e);
};

wsClass.prototype.onClose = function(e) {
    console.log('[Firefox][WS] onClose', e);
};
