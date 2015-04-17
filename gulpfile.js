'use strict';

var Config = {
        tmpDir: './.tmp',
        outputDir: './dist'
    },

    __ = function(string) {
        if(string.match(/\{\{.*\}\}/ig)) {
            for(var i in Config) {
                var _regex = new RegExp('{{( )*' + i + '( )*}}', 'ig');
                string = string.replace( _regex, Config[i]);
            }
        }

        return string;
    };




var util = require('gulp-util'),
    gulp = require('gulp'),
    clean = require('gulp-clean'),
    npmConfig = require('./package.json'),
    symlink = require('gulp-symlink'),
    shell = require('gulp-shell'),
    unzip = require('gulp-unzip'),
    zip = require('gulp-zip'),
    replace = require('gulp-replace'),
    xeditor = require('gulp-xml-editor'),
    expect = require('gulp-expect-file'),
    libxmljs = require('libxmljs'),
    gulpsync = require('gulp-sync')(gulp);



// clean .tmp
gulp.task('clean', function() {
    return gulp.src([__('{{ tmpDir }}')], { read: false })
        .pipe(clean());
});


gulp.task('build-all', function() {

});


// Default
gulp.task('default', gulpsync.sync([
    'clean',
    'build-all'
]));
