goog.provide 'app.LocalStorage'

goog.require 'goog.storage.Storage'
goog.require 'goog.storage.mechanism.mechanismfactory'

class app.LocalStorage

  ###*
    @constructor
    @final
  ###
  constructor: ->
    @createStorage_()

  ###*
    @enum {string}
  ###
  @Keys:
    TODOS: 'todos-este'

  ###*
    @type {goog.storage.Storage}
    @private
  ###
  storage_: null

  ###*
    @private
  ###
  createStorage_: ->
    mechanism = goog.storage.mechanism.mechanismfactory
      .createHTML5LocalStorage()
    if !mechanism
      throw new Error 'HTML5 Local Storage is not available.'
    @storage_ = new goog.storage.Storage mechanism

  ###*
    @return {*}
  ###
  loadTodos: ->
    @storage_.get LocalStorage.Keys.TODOS

  ###*
    @param {app.todos.Todos} todos
  ###
  saveTodos: (todos) ->
    @storage_.set LocalStorage.Keys.TODOS, todos