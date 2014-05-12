gulp = require 'gulp'

GulpEste = require 'gulp-este'
express = require 'express'
rimraf = require 'rimraf'
runSequence = require 'run-sequence'
yargs = require 'yargs'

args = yargs
  .alias 'p', 'production'
  .argv

este = new GulpEste __dirname, args.production, '../../../..'

paths =
  coffee: [
    'bower_components/este-library/este/**/*.coffee'
    'src/**/*.coffee'
  ]
  jsx: [
    'src/**/*.jsx'
  ]
  js: [
    'bower_components/closure-library/**/*.js'
    'bower_components/este-library/este/**/*.js'
    'js/**/*.js'
    'tmp/**/*.js'
    '!**/build/**'
  ]
  unittest: [
    'js/**/*_test.js'
  ]
  compiler: 'bower_components/closure-compiler/compiler.jar'
  externs: [
    'bower_components/react-externs/externs.js'
  ]
  concatAll:
    development: [
      'bower_components/react/react-with-addons.js'
    ]
    production: [
      'bower_components/react/react-with-addons.min.js'
    ]

dirs =
  googBaseJs: 'bower_components/closure-library/closure/goog'
  watch: ['src', 'js']

srcToJs = (path) ->
  path.dirname = path.dirname.replace /^src/, (dir) -> 'js'

gulp.task 'clean', (done) ->
  rimraf './js', done

gulp.task 'coffee', ->
  este.coffee paths.coffee, rename: srcToJs

gulp.task 'jsx', ->
  este.jsx paths.jsx, rename: srcToJs

gulp.task 'transpile', (done) ->
  runSequence 'clean', 'coffee', 'jsx', done

gulp.task 'deps', ->
  este.deps paths.js

gulp.task 'unittest', ->
  este.unitTest dirs.googBaseJs, paths.unittest

gulp.task 'dicontainer', ->
  este.diContainer dirs.googBaseJs, [
    name: 'app.DiContainer'
    resolve: ['App']
  ]

gulp.task 'concat-deps', ->
  este.concatDeps()

gulp.task 'compile-clientapp', ->
  este.compile paths.js, 'build',
    compilerPath: paths.compiler
    compilerFlags:
      closure_entry_point: 'app.main'
      externs: paths.externs

gulp.task 'concat-all', ->
  este.concatAll
    'build/app.js': paths.concatAll

gulp.task 'livereload-notify', ->
  este.liveReloadNotify()

gulp.task 'js', (done) ->
  runSequence [
    'deps' if este.shouldCreateDeps()
    'unittest'
    'dicontainer'
    'concat-deps'
    'compile-clientapp' if args.production
    'concat-all'
    'livereload-notify' if este.shouldNotify()
    done
  ].filter((task) -> task)...

gulp.task 'build', (done) ->
  runSequence 'transpile', 'js', done

gulp.task 'livereload-server', ->
  este.liveReloadServer()

gulp.task 'watch', ->
  este.watch dirs.watch,
    coffee: 'coffee'
    js: 'js'
    jsx: 'jsx'
  , (task) -> gulp.start task

gulp.task 'server', ->
  app = express()
  app.use express.static '.'
  app.listen 8000

gulp.task 'run', (done) ->
  runSequence [
    'livereload-server' if !args.production
    'watch'
    'server'
    done
  ].filter((task) -> task)...

gulp.task 'default', (done) ->
  runSequence 'build', 'run', ->
    done()
    console.log 'Point your browser to http://localhost:8000'

gulp.task 'bump', (done) ->
  este.bump './*.json', yargs, done