"use strict";var _require=require("chrome"),Cc=_require.Cc,Ci=_require.Ci,Cu=_require.Cu,components=_require.components;Cu["import"]("resource://gre/modules/NetUtil.jsm"),Cu["import"]("resource://gre/modules/FileUtils.jsm");var _require2=require("./util/Object"),Object=_require2.Object,fileIO=function(e){this.DIR={TmpD:"TmpD",Desk:"Desk"},this.isOpened=!1,this.filename="",this.nsIFile=void 0;var t={debug_mode:!0,prefix:"[Default]",dir:this.DIR.TmpD,mode:"r",filename:"test.txt"};return this.options=Object.extend(t,e),this.permissions={r:1,w:2,"w+":34,a:18},this};fileIO.prototype.open=function(){this.nsIFile=FileUtils.getFile(this.options.dir,[this.options.filename]);var e=Cc["@mozilla.org/network/file-output-stream;1"].createInstance(Ci.nsIFileOutputStream),t=this.permissions[this.options.mode];return this.nsIFile.exists()||(t|=8),e.init(this.nsIFile,t,666,0),this.converter=Cc["@mozilla.org/intl/converter-output-stream;1"].createInstance(Ci.nsIConverterOutputStream),this.converter.init(e,"UTF-8",0,0),this},fileIO.prototype.write=function(e){this.converter.writeString(e)},fileIO.prototype.writeln=function(e){this.converter.writeString(e+"\r\n")},fileIO.prototype.close=function(){this.converter.close()},exports.fileIO=fileIO;