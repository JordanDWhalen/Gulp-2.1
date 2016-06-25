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
filter    = require('gulp-filter');

gulp.task('css', function() {
  return gulp.src('dev/sass/application.scss')
  .pipe(sourcemaps.init())
  .pipe(globbing({extensions: '.scss'}))
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(autoprefixer({cascade: false}))
  .pipe(sourcemaps.write())
  .on('error', handleError)
  .pipe(gulp.dest('public/css'));
});

gulp.task('vendor-js', function() {
  return gulp.src('dev/js/vendor/*.js')
  .pipe(sourcemaps.init())
  .pipe(concat('application-vendor.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .on('error', handleError)
  .pipe(gulp.dest('public/js'));
});

gulp.task('js', function() {
  return gulp.src(['dev/js/*/*.js', 'dev/js/*.js', '!dev/js/vendor/*.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('application.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .on('error', handleError)
  .pipe(gulp.dest('public/js'));
});

gulp.task('svg', function () {
  return gulp.src('dev/**/*.svg')
  .pipe(svg(
    {
      "dest": ".",
      "mode": {
        "symbol": true,
        'symbol': {
          'dest': '.',
          'sprite': 'sprite.svg'
        }
      }

    }
  ))
  .on('error', handleError)
  .pipe(gulp.dest("public/img/"));
});

gulp.task('img', function() {
  return gulp.src('dev/img/**/*.{jpg,jpeg,png,gif,ico}')
  .pipe(flatten())
  .pipe(newer('public/img'))
  .pipe(imagemin({
    optimizationLevel: 5,
    progressive: true,
    interlaced: true,
    svgoPlugins: []
  }))
  .on('error', handleError)
  .pipe(gulp.dest('public/img'));
});

gulp.task('html', function() {
  return gulp.src('public/html/*.html')
  .pipe(fileinclude({
    prefix: '@@',
    basepath: '@file'
  }))
  .on('error', handleError)
  .pipe(gulp.dest('public/'));
});

gulp.task('open', function(){
  gulp.src('')
  .pipe(open({ uri: 'http://localhost:8080'}));
});

gulp.task('connect', function() {
  gulp.watch('dev/sass/**/**/*.scss', ['css']);
  gulp.watch('dev/js/vendor/*.js', ['vendor-js']);
  gulp.watch(['dev/js/**/*.js', '!dev/js/vendor/*.js'], ['js']);
  gulp.watch('dev/img/**/*.{jpg,jpeg,png,gif,ico}', ['img']);
  gulp.watch('dev/img/**/*.{svg}', ['svg']);
  gulp.watch('public/img/**/*.svg', ['html']);
  gulp.watch('public/html/**/*.html', ['html']);

  livereload.listen();

  gulp.watch(['public/*.html', 'public/js/*.js', 'dev/img/**/*.svg', '.{jpg,jpeg,png,gif,ico}', 'public/css/*.css']).on('change', livereload.changed);

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

gulp.task('default', ['css', 'vendor-js', 'js', 'svg', 'img', 'html', 'connect', 'open']);
