"use strict";var uuid=function(){var x=void 0===arguments[0]?"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx":arguments[0];return x.replace(/[xy]/g,function(x){var r=16*Math.random()|0,u="x"==x?r:3&r|8;return u.toString(16)})};exports.uuid=uuid;