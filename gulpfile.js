'use strict'
const gulp = require('gulp'),
  newer = require('gulp-newer'),
  plumber = require('gulp-plumber'),
  notify = require('gulp-notify')

gulp.task('pug-to-html', () =>
  gulp
    .src('src/html/*.pug' /*, { since: gulp.lastRun("pug-to-html") }*/)
    .pipe(plumber({ errorHandler: notify.onError('Pug: <%= error.message %>') }))
    .pipe(newer('public'))
    .pipe(require('gulp-pug')({ pretty: '\t' }))
    .pipe(gulp.dest('public'))
)

gulp.task('html', () =>
  gulp
    .src('src/html/*.html' /*, { since: gulp.lastRun("html") }*/)
    .pipe(plumber({ errorHandler: notify.onError('HTML: <%= error.message %>') }))
    .pipe(newer('public'))
    .pipe(gulp.dest('public'))
)

gulp.task('img', () =>
  gulp
    .src('src/img/**/*.*')
    .pipe(plumber({ errorHandler: notify.onError('IMAGES: <%= error.message %>') }))
    .pipe(newer('public/img/'))
    /*.pipe(
      require('gulp-imagemin')({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true,
      })
    )*/
    .pipe(gulp.dest('public/img/'))
)

const postcss = require('gulp-postcss'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename')

gulp.task('css', () =>
  gulp
    .src('src/css/*.scss' /*, { since: gulp.lastRun("css") }*/)
    .pipe(plumber({ errorHandler: notify.onError('CSS: <%= error.message %>') }))
    .pipe(sourcemaps.init())
    .pipe(
      postcss(require('./configs/postcss.config.js').plugins, {
        parser: require('postcss-scss'),
      })
    )
    .pipe(rename({ extname: '.css' }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/styles'))
)

gulp.task('fonts', () =>
  gulp
    .src('src/css/fonts/**/*.*')
    .pipe(plumber({ errorHandler: notify.onError('FONTS: <%= error.message %>') }))
    .pipe(newer('public/styles/fonts/'))
    .pipe(gulp.dest('public/styles/fonts/'))
)

const compileJS = require('gulp-babel')(require('./configs/babelrc.js'))

gulp.task('js', () =>
  gulp
    .src('src/components/**/*.js' /*, {
      since: gulp.lastRun('js'),
    }*/)
    .pipe(
      plumber({
        errorHandler: notify.onError('JS (scripts-components): <%= error.message %>'),
      })
    )
    // .pipe(newer('public/js/components'))
    .pipe(compileJS)
    .pipe(gulp.dest('public/js/components'))
)

const libraries = {
  names: Object.keys(require(`./package.json`).dependencies),
  get sources() {
    return this.names.map(libraryName => `./node_modules/${libraryName}/**`)
  },
  get dist() {
    return this.names.map(libraryName => `public/libs/${libraryName}`)
  },
}

gulp.task('import-libraries', () =>
  gulp
    .src(libraries.sources)
    .pipe(
      plumber({
        errorHandler: notify.onError('Import libraries: <%= error.message %>'),
      })
    )
    // .pipe(newer("public/libs"))
    .pipe(
      gulp.dest(file => {
        const libraryName = file.base.split('node_modules/')[1]
        return `public/libs/${libraryName}`
      })
    )
)

gulp.task('js-optim', () =>
  gulp
    .src('public/js/**/*.js')
    .pipe(
      plumber({
        errorHandler: notify.onError('JS (optimization): <%= error.message %>'),
      })
    )
    .pipe(require('gulp-uglify-es').default())
    .pipe(gulp.dest('public/js'))
)

gulp.task('сss-optim', () =>
  gulp
    .src('public/styles/**/*.css')
    .pipe(
      plumber({
        errorHandler: notify.onError('CSS (optimization): <%= error.message %>'),
      })
    )
    .pipe(postcss([require('cssnano')]))
    .pipe(gulp.dest('public'))
)

const browserSync = require('browser-sync').create()
gulp.task('reload', done => {
  browserSync.reload()
  done()
})

const compileAll = gulp.parallel('import-libraries', gulp.series('fonts', 'img', 'css'), 'js', 'pug-to-html', 'html'),
  cleanBuildFolder = async () => await require('del')(['./public'])

gulp.task(
  'default',
  gulp.series(cleanBuildFolder, compileAll, function() {
    browserSync.init({
      server: {
        baseDir: './public/',
      },
    }),
      gulp.watch('src/css/fonts/**/*.*', gulp.series('fonts', 'reload')),
      gulp.watch('src/img/**/*.*', gulp.series('img', 'reload')),
      gulp.watch('src/**/*.scss', gulp.series('css', 'reload')),
      gulp.watch('src/**/*.js', gulp.series('js', 'reload')),
      gulp.watch('src/**/*.pug', gulp.series('pug-to-html', 'reload')),
      gulp.watch('src/**/*.html', gulp.series('html', 'reload'))
  })
)

gulp.task('build', gulp.series(cleanBuildFolder, compileAll, gulp.parallel('js-optim', 'сss-optim')))
