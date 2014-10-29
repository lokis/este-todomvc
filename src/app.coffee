goog.provide 'App'

class App

  ###*
    @param {app.Routes} routes
    @param {este.Router} router
    @param {app.todos.react.App} reactApp
    @param {Element} element
    @param {app.todos.Store} store
    @constructor
  ###
  constructor: (routes, router, @reactApp, @element, store) ->

    syncUI = ->
      React.render reactApp.component(), element

    routes.addToEste router, (route, params) ->
      routes.setActive route, params
      syncUI()

    router.start()
    store.listen 'change', syncUI
