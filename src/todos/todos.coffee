goog.provide 'app.todos.Todos'

goog.require 'app.todos.Todo'

class app.todos.Todos

  ###*
    @constructor
  ###
  constructor: ->
    @items = []

  ###*
    @type {Array.<app.todos.Todo>}
    @expose
  ###
  items: null

  ###*
    @param {string} title
  ###
  add: (title) ->
    todo = new app.todos.Todo title
    @items.push todo

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  remaining: ->
    @items.filter (item) -> !item.completed

  ###*
    @return {Array.<app.todos.Todo>}
  ###
  completed: ->
    @items.filter (item) -> item.completed

  ###*
    @param {boolean} completed
  ###
  setAllCompleted: (completed) ->
    @items.forEach (item) -> item.completed = completed

  clearCompleted: ->
    @items = @remaining()

  ###*
    @param {*} json
  ###
  deserialize: (json) ->
    @items.length = 0
    json.items.forEach (item) =>
      todo = new app.todos.Todo
      goog.mixin todo, item
      @items.push todo
    return

  ###*
    We have to create new object because TodoMVC specification requires that
    editable property should not be serialized.
    @return {app.todos.Todos}
  ###
  serialize: ->
    todos = new app.todos.Todos
    @items.forEach (item) =>
      todo = new app.todos.Todo
      goog.mixin todo, item
      delete todo.editing
      todos.items.push todo
    todos