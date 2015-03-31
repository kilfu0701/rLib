'use strict';

let uuid = (str = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx') =>
    str.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });

exports.uuid = uuid;
