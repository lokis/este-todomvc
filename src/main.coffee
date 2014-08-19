goog.provide 'app.main'

goog.require 'app.DiContainer'

###*
  @param {Object} data Server side data. Useful for config, preload, whatever.
###
app.main = (data) ->
  # DiContainer is goodness. Read: https://github.com/steida/closure-dicontainer
  container = new app.DiContainer

  # Here we can pass runtime values to any class in project or library.
  container.configure
    resolve: App
    with: element: document.querySelector '#todoapp'
  ,
    resolve: este.History
    # By default history uses autodetection. We can enforce hashchange.
    by: -> new este.History forceHash: true

  # This method wires all app classes for us. No more factories everywhere.
  # And as nice result, the app is modular and classes testable. Check App.
  container.resolveApp()

goog.exportSymbol 'app.main', app.main
