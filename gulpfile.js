const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const watchify = require('watchify');
const tsify = require('tsify');
const fancy_log = require('fancy-log');
const cleanCSS = require('gulp-clean-css');
const paths = {
  pages: ['src/*.html'],
};
function compileAndMinifyCSS() {
  return gulp
    .src('src/style.css') // Sélectionne le fichier style.css dans le répertoire src
    .pipe(cleanCSS()) // Minifie le CSS
    .pipe(gulp.dest('dist/'));
}
const watchedBrowserify = watchify(
  browserify({
    basedir: '.',
    debug: true,
    entries: ['src/index.ts'],
    cache: {},
    packageCache: {},
  }).plugin(tsify)
);
gulp.task('copy-html', function () {
  return gulp.src(paths.pages).pipe(gulp.dest('dist'));
});
function bundle() {
  return watchedBrowserify
    .bundle()
    .on('error', fancy_log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}
gulp.task('default', gulp.series(gulp.parallel('copy-html'), bundle));
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', fancy_log);
gulp.watch('src/style.css', compileAndMinifyCSS);
