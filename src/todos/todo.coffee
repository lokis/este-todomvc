goog.provide 'app.todos.Todo'

goog.require 'goog.string'

class app.todos.Todo

  ###*
    @param {string=} title
    @param {Function=} randomStringGenerator
    @constructor
  ###
  constructor: (
      @title = '',
      randomStringGenerator = goog.string.getRandomString) ->

    @id = randomStringGenerator()

  ###*
    @type {string}
    @expose
  ###
  id: ''

  ###*
    @type {string}
    @expose
  ###
  title: ''

  ###*
    @type {boolean}
    @expose
  ###
  completed: false

  ###*
    @type {boolean}
    @expose
  ###
  editing: false

  toggle: ->
    @completed = !@completed