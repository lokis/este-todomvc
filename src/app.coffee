goog.provide 'App'

class App

  ###*
    @param {este.Router} router
    @param {app.Routes} routes
    @param {app.todos.react.App} reactApp
    @param {Element} element
    @constructor
  ###
  constructor: (router, routes, @reactApp, @element) ->
    routes.addToEste router
    routes.listen este.Routes.EventType.CHANGE, @syncUi.bind @
    router.start()

  ###*
    Sync UI with app model.
  ###
  syncUi: ->
    if !@component
      @component = React.renderComponent @reactApp.create(), @element
      return
    @component.forceUpdate()