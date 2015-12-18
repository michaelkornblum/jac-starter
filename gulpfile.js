var gulp = require('gulp'),
  $g = require('gulp-load-plugins')(),
  browserify = require('browserify'),
  transform = require('vinyl-transform'),
  coffeeify = require('coffeeify'),
  source = require('vinyl-source-stream'),
  browserSync = require('browser-sync'),
  runSequence = require('run-sequence');

gulp.task('templates', function() {
  return gulp.src('./templates/**/*.jade')
    .pipe($g.jade({
      pretty: true
    }))
    .pipe(gulp.dest('./build/'))
});

gulp.task('scripts', function() {
  return browserify('./scripts/app.coffee')
    .transform(coffeeify)
    .bundle()
    .pipe(source('app.js'))
    .pipe($g.streamify($g.ngAnnotate()))
    .pipe($g.streamify($g.uglify()))
    .pipe(gulp.dest('./build/scripts'));
});

gulp.task('server', function() {
  browserSync.init({
    server: {
      baseDir: './build'
    }
  });
});

gulp.task('watch', function() {
  gulp.watch('templates/**/*', ['templates']);
  gulp.watch('scripts/**/*', ['scripts']);
  gulp.watch('build/**/*', browserSync.reload);
});

gulp.task('default', function(){
  runSequence('scripts', 'templates', 'server', 'watch');
});
