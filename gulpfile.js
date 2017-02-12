var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
globbing = require('gulp-css-globbing'),
sourcemaps = require('gulp-sourcemaps'),
imagemin = require('gulp-imagemin'),
flatten = require('gulp-flatten'),
newer = require('gulp-newer'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
connect = require('gulp-connect'),
open = require('gulp-open'),
svg = require('gulp-svg-sprite'),
fileinclude = require('gulp-file-include'),
livereload = require('gulp-livereload'),
filter    = require('gulp-filter'),
gutil = require('gulp-util'),
path = require('path');

gulp.task('css', function() {
  return gulp.src('dev/sass/application.scss')
  .pipe(flatten())
  .pipe(newer('dev/sass/**/*'))
  .pipe(sourcemaps.init())
  .pipe(globbing({extensions: '.scss'}))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({cascade: false}))
  .pipe(sourcemaps.write())
  .on('error', handleError)
  .pipe(gulp.dest('public/css'));
  // .pipe(gulp.dest('../wp-content/themes/sk-cms/assets/css'));
});

gulp.task('vendor-js', function() {
  return gulp.src('dev/js/vendor/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('application-vendor.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .on('error', handleError)
  .pipe(gulp.dest('public/js'));
  // .pipe(gulp.dest('../wp-content/themes/sk-cms/assets/js'));
});

gulp.task('js', function() {
  return gulp.src(['dev/js/*.js',  'dev/js/**/*.js', '!dev/js/vendor/*.js'])
  .pipe(sourcemaps.init())
  .on('error', handleError)
  .pipe(concat('application.js'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public/js'));
  // .pipe(gulp.dest('../wp-content/themes/sk-cms/assets/js'));
});

gulp.task('media', function() {
  return gulp.src('dev/media/**/*.{jpg,jpeg,png,gif,ico,svg}')
  .pipe(flatten())
  .pipe(newer('public/media'))
  .pipe(imagemin({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true,
    svgoPlugins: []
  }))
  .on('error', handleError)
  .pipe(gulp.dest('public/media'));
  // .pipe(gulp.dest('../wp-content/themes/sk-cms/assets/media'));
});

gulp.task('html',  function() {
  return gulp.src('dev/html/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .on('error', handleError)
  .pipe(newer('dev/html/**/*.html'))
  .on('error', handleError)
  .pipe(gulp.dest('public/'));
});

gulp.task('open', function(){
  setTimeout(function(){
    gulp.src('')
    .pipe(open({ uri: 'http://localhost:8080'}));
  }, 5000);
});

gulp.task('connect', function() {
  gulp.watch('dev/sass/**/**/*.scss', ['css']);
  gulp.watch('dev/js/vendor/*.js', ['vendor-js']);
  gulp.watch(['dev/js/**/*.js', '!dev/js/vendor/*.js'], ['js']);
  gulp.watch('dev/media/**/*.{jpg,jpeg,png,gif,ico,svg}', ['media']);
  gulp.watch('dev/html/*.html', ['html']);
  gulp.watch('dev/html/**/*.html', ['html']);

  livereload.listen();

  gulp.watch(['public/*.html', 'dev/js/**/*.js', '.{jpg,jpeg,png,gif,ico,svg}', 'public/css/*.css']).on('change', livereload.changed);

  connect.server({
    root: 'public/',
    // host: '',
    keepalive: false,
    livereload: true
  });

});

// Error reporting function
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('default', ['css', 'vendor-js', 'js', 'media', 'html', 'connect', 'open']);
