var fs = require('fs');
var path = require('path');
var request = require('request');
var AdmZip = require('adm-zip');

module.exports = LeoDownload;

function LeoDownload(env) {
    if (!this instanceof LeoDownload)
        return new LeoDonwload();
    this.env = env;
}

function isZip(url){
    var reg = new RegExp('.+\.zip$');
    if(url.match(reg) === null){
        return false;
    }
    return true;
}

LeoDownload.prototype.downloadLibrary = function (url,path) {
    if(!isZip(url)){
        return;
    }
    var data = [],
        dataLen = 0;
    request(url)
        .on('data', function(chunk){
            data.push(chunk);
            dataLen += chunk.length;
        })
        .on('end', function() {
            var buf = new Buffer(dataLen);
            for (var i = 0, len = data.length, pos = 0; i < len; i++) {
                data[i].copy(buf, pos);
                pos += data[i].length;
            }
            var zip = new AdmZip(buf);
            var zipEntries = zip.getEntries();
            zip.extractAllTo(path, true);
        });
};
