const gulp = require('gulp'),
  scss = require('gulp-sass'),
  csso = require('gulp-csso'),
  cmq = require('gulp-combine-mq'),
  autoprefixer = require('gulp-autoprefixer'),
  csstree = require('gulp-csstree'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename'),
  csscomb = require('gulp-csscomb')

gulp.task('scss', () => {
  return gulp.src('./scss/**/*.scss')
    .pipe(scss({outputStyle: 'expanded'}).on('error',
      e => console.log('SCSS error :( \n', e.message))
    )
    .pipe(rename('main.css'))
    .pipe(csstree())
    .pipe(cmq({beautify: false}))
    .pipe(autoprefixer({
      browsers: ['> 2%', 'last 6 versions', 'not ie <= 11'],
      cascade: false,
      flexbox: 'no-2009'
    }))
    .pipe(csso({
      restructure: true,
      sourceMap: false,
      usage: null,
      comments: 'none'
    }))
    .pipe(gulp.dest('../dist/css'))
})

gulp.task('clean-static', () => {
  return gulp.src([
    './dist/fonts',
    './dist/img',
    './dist/*.*'
  ], {read: false})
    .pipe(clean({force: false}))
})

gulp.task('move-static', ['clean-static'], () => {
  gulp.src('./html/*.html', {base: './html'})
    .pipe(gulp.dest('../dist/'))

  return gulp.src(['./img/**/*.*', './fonts/**/*.*'], {base: './'})
    .pipe(gulp.dest('../dist/'))
})

gulp.task('build', ['move-static', 'scss'])

gulp.task('csscombify', () => {
  return gulp.src('./scss/styles/**/*.scss')
    .pipe(csscomb())
    .pipe(gulp.dest('./scss/styles'))
})

gulp.task('watch', () => {
  gulp.watch('./scss/**/*.scss', ['scss'])
  gulp.watch('./html/*.html', ['move-static'])
  gulp.watch('./img/*.*', ['move-static'])
})

gulp.task('default', ['watch'])
