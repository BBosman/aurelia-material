const gulp = require('gulp');
const del = require('del');
const vinylPaths = require('vinyl-paths');
const babel = require('gulp-babel');
const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const runSequence = require('run-sequence');
const path = require('path');
const paths = {
  source: 'src/**/*.js',
  dist: 'dist',
  sourceRoot: path.join(__dirname, 'src')
};

// need this options to use decorators
const compilerOptions = {
  presets: ['es2015', 'stage-1'],
  plugins: ['transform-decorators-legacy']
};


gulp.task('build-client', () => {
  return gulp.src(paths.source)
    .pipe(plumber())
    .pipe(changed(paths.dist, {extension: '.js'}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel(compilerOptions))
    .pipe(sourcemaps.write('.', { includeContent: true, sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.dist));
});


gulp.task('build', (callback) => {
  return runSequence(
    'clean',
    'build-client',
    callback
  );
});

gulp.task('clean', () => {
  return gulp.src([paths.dist])
    .pipe(vinylPaths(del));
});

gulp.task('default', ['build']);

