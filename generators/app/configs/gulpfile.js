/* eslint-disable */
const gulp = require('gulp'),
  scss = require('gulp-sass'),
  csso = require('gulp-csso'),
  cmq = require('gulp-combine-mq'),
  autoprefixer = require('gulp-autoprefixer'),
  csstree = require('gulp-csstree'),
  clean = require('gulp-clean'),
  rename = require('gulp-rename')

gulp.task('scss', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(scss({ outputStyle: 'expanded' }).on('error', e => console.log(' Scss err :( \n', e.message)))
    .pipe(rename('main.css'))
    .pipe(csstree())
    .pipe(cmq({ beautify: false }))
    .pipe(autoprefixer({
      browsers: ['> 2%', 'last 6 versions'],
      cascade: false,
      flexbox: true
    }))
    .pipe(csso({
      restructure: true,
      sourceMap: false,
      usage: null,
      comments: 'none'
    }))
    .pipe(gulp.dest('./dist/css'))
})

gulp.task('clean-static', () => {
  return gulp.src(['./dist/fonts', './dist/img', './dist/*.*'], { read: false })
    .pipe(clean({ force: true }))
})

gulp.task('move-static', ['clean-static'], () => {
  gulp.src('./src/html/*.html', { base: './src/html/' })
    .pipe(gulp.dest('./dist/'))

  gulp.src(['./src/js/**/*.*', './src/js/**/*.*'], { base: './src/' })
    .pipe(gulp.dest('./dist/'))

  return gulp.src(['./src/img/**/*.*', './src/fonts/**/*.*'], { base: './src/' })
    .pipe(gulp.dest('./dist/'))
})

gulp.task('build', ['move-static', 'scss'])

gulp.task('watch', () => {
  gulp.watch('./src/scss/**/*.scss', ['scss'])
  gulp.watch('./src/html/*.html', ['move-static'])
  gulp.watch('./src/js/*.js', ['move-static'])
})

gulp.task('default', ['watch'])
