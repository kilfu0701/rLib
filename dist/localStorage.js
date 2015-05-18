"use strict";var ss=require("sdk/simple-storage"),_require=require("./logger"),logger=_require.logger,_require2=require("./settings"),settings=_require2.settings,lg=new logger({debug_mode:settings.debug.mode,prefix:"[LS]"}),o={getData:function(e){return lg.log("rLib/localStorage::getData =",e,ss.storage[e]),ss.storage[e]},setData:function(e,t){lg.log("rLib/localStorage::setData =",e,t),ss.storage[e]=t},deleteData:function(e){lg.log("rLib/localStorage::deleteData =",e),delete ss.storage[e]},updateData:function(e,t){lg.log("rLib/localStorage::updateData =",e,t),ss.storage[e]=t},clear:function(){for(var e in ss.storage)delete ss.storage[e]}};exports.get=o.getData,exports.set=o.setData,exports["delete"]=o.deleteData,exports.update=o.updateData,exports.clear=o.clear,exports.$data=ss.storage;