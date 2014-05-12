goog.provide 'app.todos.Store'
goog.provide 'app.todos.Store.EventType'

goog.require 'app.todos.Todo'
goog.require 'goog.array'
goog.require 'goog.events.EventTarget'

class app.todos.Store extends goog.events.EventTarget

  ###*
    @param {app.todos.Todos} todos
    @param {app.LocalStorage} localStorage
    @param {app.Routes} routes
    @constructor
    @extends {goog.events.EventTarget}
    @final
  ###
  constructor: (@todos, @localStorage, routes) ->
    super()
    @deserialize_()
    routes.listen app.Routes.EventType.CHANGE, =>
      @notify_()

  ###*
    @enum {string}
  ###
  @EventType:
    CHANGE: 'change'

  ###*
    @private
  ###
  deserialize_: ->
    localTodos = @localStorage.loadTodos()
    @todos.deserialize localTodos if localTodos

  ###*
    @private
  ###
  serialize_: ->
    @localStorage.saveTodos @todos.serialize()

  ###*
    @private
  ###
  notify_: ->
    @serialize_()
    @dispatchEvent Store.EventType.CHANGE

  ###*
    @param {string} title
  ###
  add: (title) ->
    @todos.add title
    @notify_()

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  all: ->
    @todos.items

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  remaining: ->
    @todos.remaining()

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  completed: ->
    @todos.completed()

  ###*
    @param {boolean} completed
  ###
  setAllCompleted: (completed) ->
    @todos.setAllCompleted completed
    @notify_()

  ###*
    @param {app.todos.Todo} todo
  ###
  toggle: (todo) ->
    todo.toggle()
    @notify_()

  ###*
    @param {app.todos.Todo} todo
    @param {boolean} enable
  ###
  setEditing: (todo, enable) ->
    todo.editing = enable
    @notify_()

  ###*
    @param {app.todos.Todo} todo
    @param {string} title
  ###
  setTitle: (todo, title) ->
    todo.title = title
    @notify_()

  ###*
    @param {app.todos.Todo} todo
  ###
  remove: (todo) ->
    goog.array.remove @todos.items, todo
    @notify_()

  clearCompleted: ->
    @todos.clearCompleted()
    @notify_()