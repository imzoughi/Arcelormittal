/*
* MrRayures - www.mr-rayures.com
* Merci Alsacreation pour le tuto : http://www.alsacreations.com/tuto/lire/1686-introduction-a-gulp.html
* We <3 Gulp ;)
*/

// Requis
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var serve = require('gulp-live-serve');

// Include plugins
var plugins = require('gulp-load-plugins')(); // tous les plugins de package.json
var extender = require('gulp-html-extend');
var panini = require('panini');
var concat = require('gulp-uglify');
var realFavicon = require ('gulp-real-favicon');
var fs = require('fs');
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


// Variables de chemins
var source = 'src'; // dossier de travail
var prod = 'dist'; // dossier à livrer


// Tâche "build" = SASS + autoprefixer + CSScomb + beautify (source -> prod)
gulp.task('css', function () {
  return gulp.src(source + '/assets/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.sass().on('error', sass.logError))
    .pipe(plugins.csscomb())
    .pipe(plugins.cssbeautify({indent: '  '}))
    .pipe(plugins.autoprefixer())
    .pipe(sourcemaps.write({includeContent: false, sourceRoot: './assets'}))
    .pipe(gulp.dest(prod + '/assets/css/'))
    .pipe(livereload());
});


// Tâche "minify" = minification CSS (prod -> prod)
gulp.task('minify', function () {
  return gulp.src([prod + '/assets/css/*.css', '!'+ prod + '/assets/css/*min.css'])
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(prod + '/assets/css/'));
});


// Tâche "js" = concat + uglify (source -> prod)
gulp.task('js', function() {
  gulp.src([source + '/assets/js/*.js'])
    .pipe(plugins.plumber({errorHandler: plugins.notify.onError("Error: <%= error.message %>")}))
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(prod + '/assets/js/'))
    .pipe(livereload());

  gulp.src([source + '/assets/js/*.js'])
    .pipe(plugins.concat('app.js'))
    .pipe(gulp.dest(prod + '/assets/js/'))
    .pipe(livereload());
});


// Html extend : simple templating engine
gulp.task('html', function() {
  return gulp.src([source + '/*.html'])
  // Generates HTML includes
  .pipe(extender({
    annotations: false,
    verbose: false
  })) // default options
  .pipe(gulp.dest(prod))
  .pipe(livereload())
});


// Tâche "img" = Images optimisées
gulp.task('img', function () {
  return gulp.src(source + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(prod + '/assets/img'))
    .pipe(livereload())
});


// Tâche "copy" = importation des fichiers sources type vendor (source -> prod)
gulp.task('copy', function () {
    return gulp.src([
        source + '/assets/img/*',
        source + '/assets/fonts/*',
        source + '/assets/glyphicons/*',
        source + '/assets/svg/**/*',
        source + '/assets/js/app.js',
        source + '/assets/vendor/**/*',
        source + '/*.png',
        source + '/*.ico',
        source + '/*.css'
      ], {
        base: 'src'
    }).pipe(gulp.dest(prod));
});



// Tâche "glyphicons" = Créations de l'icon font
gulp.task('glyphicons', function() {
 return gulp.src(source +'/assets/glyphicons/*')
    .pipe(iconfontCss({
      fontName: 'icons', // nom de la fonte, doit être identique au nom du plugin iconfont
      targetPath: '../scss/components/_icons.scss', // emplacement de la css finale
      fontPath: '../fonts/', // emplacement des fontes finales
      cssClass: 'icon'
    }))
    .pipe(iconfont({
      fontName: 'icons' // identique au nom de iconfontCss
     }))
    .pipe( gulp.dest(source + '/assets/fonts') )

    return gulp.src([
        source + '/assets/fonts/*',
        source + '/assets/glyphicons/*',
      ], {
        base: 'src'
    }).pipe(gulp.dest(prod));
});


// Tâche "favicon" = Créations des favicon via "gulp favicon"
var FAVICON_DATA_FILE = 'faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
gulp.task('generate-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: source + '/assets/img/favicon_master.png',
    dest: prod + '/assets/favicons/',
    iconsPath: '/assets/favicons/',
    design: {
      ios: {
        pictureAspect: 'noChange',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#da532c',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false,
      readmeFile: false,
      htmlCodeFile: false,
      usePathAsIs: false
    },
    markupFile: FAVICON_DATA_FILE
  }, function() {
    done();
  });
});

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
gulp.task('inject-favicon-markups', function() {
  return gulp.src([ source + '/index.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest(source));
});

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
gulp.task('check-for-favicon-update', function(done) {
  var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    }
  });
});


// Tâche "watch" = je surveille *sass
gulp.task('watch', function () {
  gulp.watch([source + '/assets/scss/*.scss', source + '/assets/scss/**/*'], ['css']);
  gulp.watch([source + '/assets/js/*.js'], ['js']);
  gulp.watch([source + '/assets/img/*.{png,jpg,jpeg,gif,svg}', source + '/assets/img/**/*.{png,jpg,jpeg,gif,svg}'], ['img']);
  gulp.watch([source + '/assets/glyphicons/*.{svg}'], ['glyphicons']);
  gulp.watch([source + '/assets/svg/**/*.{svg}'], ['copy']);
  gulp.watch([source + '/*.html', source + '/includes/**/*.html'], ['html']);
  livereload.listen();
});


// Tâche "serve" = J'affiche les modifications direct sur le browser
gulp.task('serve', function () {
    serve({
        root: './dist/',
        port: 3006,
        livereload: {
            port: 35729 // default port
        }
    })();
});


// Tâche "default"
gulp.task('default', ['css', 'html', 'img', 'js','watch', 'serve']);

// Tâche "favicon"
gulp.task('favicon', ['generate-favicon', 'inject-favicon-markups']);

// Tâche "prod" = Build + minify
gulp.task('prod', ['default', 'minify', 'img', 'copy']);

