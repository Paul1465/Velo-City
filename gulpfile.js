// Load dependancies
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
//var uglify = require('gulp-uglify-es').default;
//let uglify = require('gulp-uglify-es').default;
// Create server browser-sync
var browserSync = require('browser-sync').create();
// Path variables
var src = './app/src'; // dossier de travail
var dest = './app/dist'; // dossier à livrer
/*
* Name: sass
* Description: Compiles Sass to CSS
*/
gulp.task('sass', function () {
    return gulp.src(`${src}/assets/sass/style.scss`)
        .pipe(plugins.sass())
        .pipe(plugins.csscomb())
        .pipe(plugins.cssbeautify({indent: '  '}))
        .pipe(plugins.autoprefixer())
        .pipe(gulp.dest(`${dest}/assets/css/`))
        .pipe(browserSync.stream());
});



gulp.task('concat', function() {
    return gulp.src(`${src}/assets/js/*.js`)
      .pipe(plugins.concat('app.js'))
      .pipe(plugins.rename({
        suffix: '.min'
      }))
      
      .pipe(gulp.dest(`${dest}/assets/js/`))
      .pipe(browserSync.stream());
      
  });

// Uglify 
/*gulp.task("uglifyjs", function () {
    return gulp.src(`${src}/assets/js/*.js`)
        .pipe(plugins.rename("app.min.js"))
        .pipe(uglify(/* options ))
        .pipe(gulp.dest(`${dest}/assets/js/`))
        .pipe(browserSync.stream());
  });
/*
* Name: minify
* Description: Minification CSS
*/
gulp.task('minify', function () {
    return gulp.src(`${dest}/assets/css/*.css`)
      .pipe(plugins.csso())
      .pipe(plugins.rename('style.min.css'))
      .pipe(gulp.dest(`${dest}/assets/css/`));
});
/*
* Name: build
* Description: Compiles Sass to CSS
*/
gulp.task('build', ['sass']);
/*
* Name: prod
* Description: Build and optimizes all assets for production
*/
gulp.task('prod', ['build',  'minify']);
/*
* Name: default
* Description: Default task
*/
gulp.task('default', ['build']);
/*
* Name: watch
* Description: Automatically build when scss change
*/
gulp.task('watch', function () {
    gulp.watch(`${src}/assets/sass/*.scss`, ['build']);
});
/*
* Name: serve
* Description: Build and Refreshes the browser automatically whenever you save a file
*/
gulp.task('serve', ['sass', 'concat', 'minify' ], function() {
    browserSync.init({
        server: "./app"
    });
    gulp.watch(`${src}/assets/sass/*.scss`, ['sass']);
    gulp.watch(`${src}/assets/js/*.js`, ['concat']);
    gulp.watch(`${src}/assets/js/*.js`, ['minify']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

/*gulp.task('compress', function (cb) {
    pump([
          gulp.src(`${src}/assets/js/*.js`),
          compress(),
          // .pipe(browserSync.stream()),
         // uglify()
          gulp.dest(`${dest}/assets/js`)
      ],
      cb
    );
  });*/


