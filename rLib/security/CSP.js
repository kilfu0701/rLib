/**
 * @description
 *
 *
 * @usage
 *
 *
 * @author
 *      kilfu0701
 *
 * @license
 *      MIT
 *
 * @refs
 *      https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Using_Content_Security_Policy
 */
'use strict';

const {Cc, Ci, Cu, components} = require('chrome');
let { Object } = require('../util/Object');
const { Observer } = require('../util/Observer');


let CSP = function(options) {
    this.keys = ['default-src', 'script-src', 'object-src', 'style-src', 'img-src', 'media-src', 'frame-src', 'font-src', 'connect-src'];
    let pat_dict = {};

    for(let val of this.keys) {
        pat_dict[val] = val;
    }

    let default_options = {
        matchSites: [],
        pattern: ['self', 'resource://*'],
        allowUnsafe: true
    };

    this.options = Object.extend(default_options, options);

    this.replaceLists = pat_dict;
    this.unsafe_actions = ["'unsafe-eval'", "'unsafe-inline'"];
    this.Obs = new Observer({
        topicID: 'http-on-examine-response',
        observeCallback: this._observeCallback()
    });
}

CSP.prototype.setOptions = function(opt) {
    this.options = Object.extend(this.options, opt);

    return this.options;
};

CSP.prototype._observeCallback = function(subject, topic, data) {
    var _this = this;

    return function(subject, topic, data) {
        subject.QueryInterface(Ci.nsIHttpChannel);

        let url = subject.URI.spec;
        let opt = _this.options.pattern;

        if(_this.options.allowUnsafe === true) {
            opt.concat(_this.unsafe_actions);
        }

        let pattern = {}
        for(let key in _this.replaceLists) {
            pattern[key] = opt.join(' ');
        }

        let csp = '';
        try {
            csp = subject.getResponseHeader('content-security-policy');

            for(let k in pattern) {
                csp = csp.replace(k, pattern[k]);
            }

            subject.setResponseHeader("content-security-policy", csp, false);
        } catch(e) {

        }
    };

};



exports.CSP = CSP;
