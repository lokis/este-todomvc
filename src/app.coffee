goog.provide 'App'

class App

  ###*
    @param {este.Router} router
    @param {app.Routes} routes
    @param {app.todos.react.App} reactApp
    @param {Element} element
    @constructor
  ###
  constructor: (router, routes, reactApp, element) ->

    router.add routes.allTodos, -> routes.setActive routes.allTodos
    router.add routes.activeTodos, -> routes.setActive routes.activeTodos
    router.add routes.completedTodos, -> routes.setActive routes.completedTodos
    router.start()

    React.renderComponent reactApp.reactClass(), element