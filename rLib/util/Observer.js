/**
 * @usage
 *      const { Oberser } = require('rLib/util/Observer.js');
 *      var myObs = new Observer({
 *          topicID: 'http-on-examine-response',
 *          observeCallback: function(subject, topic, data) {
 *              // do something here
 *          }
 *      });
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 */
const {Cc, Ci, Cu, components} = require('chrome');
let { Object } = require('./Object');

let Observer = function(options) {
    let default_options = {
        topicID: 'http-on-examine-response',
        observeCallback: function(subject, topic, data) {}
    };

    this.options = Object.extend(default_options, options);
    this.register();
}

Observer.prototype.observe = function(subject, topic, data) {
    return this.options.observeCallback(subject, topic, data, this);
};

Observer.prototype.register = function() {
    var observerService = Cc['@mozilla.org/observer-service;1']
                            .getService(Ci.nsIObserverService);

    observerService.addObserver(this, this.options.topicID, false);
};

Observer.prototype.unregister = function() {
    var observerService = Cc['@mozilla.org/observer-service;1']
                            .getService(Ci.nsIObserverService);
    observerService.removeObserver(this, this.options.topicID);
};

exports.Observer = Observer;
