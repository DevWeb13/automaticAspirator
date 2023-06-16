const gulp = require('gulp');
const typescript = require('gulp-typescript');

const tsProject = typescript.createProject('tsconfig.json');

function compileTypeScript() {
  return gulp
    .src('*.ts') // Compile all TypeScript files in the project root
    .pipe(tsProject())
    .js.pipe(gulp.dest('./')); // Put the result in the project root
}

function watch() {
  gulp.watch('*.ts', compileTypeScript); // Watch all the .ts files, then run compileTypeScript
}

exports.default = gulp.series(compileTypeScript, watch);
