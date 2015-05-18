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


var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var plumber = require('gulp-plumber');

gulp.task("default", function () {
    return gulp.src("rLib/**/*.js")
        //.pipe(sourcemaps.init())
        //.pipe(concat("all.js"))
        .pipe(plumber())
        .pipe(babel())
        //.pipe(sourcemaps.write("../dist-map/"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"));
});


//var version = util.env['build-version'] || 'new';
//
//// minify *.js
//gulp.task('compress', function() {
//    return gulp.src('rLib/**/*.js')
//        .pipe(babel())
//        .pipe(gulp.dest( __('{{ outputDir }}/' + version) ));
//});
//
//// clean .tmp
//gulp.task('clean', function() {
//    return gulp.src([__('{{ tmpDir }}')], { read: false })
//        .pipe(clean());
//});
//
//gulp.task('build-all', function() {
//    gulp.start('compress');
//});
//
//
//glup.task('test', function() {
//    //gulp.src('rLib/**/*.js')
//    //    .pipe(browserify())
//    //    .add(es6ify.runtime)
//    //    .transform(es6ify)
//    //    .bundle({ debug: true });
//});
//
//
//
//
//// Default
//gulp.task('default', gulpsync.sync([
//    'clean',
//    'build-all',
//    'test'
//]));
