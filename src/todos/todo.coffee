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
      # Make it optional, so we can mock randomStringGenerator in unit test.
      randomStringGenerator = goog.string.getRandomString) ->

    @id = randomStringGenerator()

  ###*
    @type {string}
  ###
  id: ''

  ###*
    @type {string}
  ###
  title: ''

  ###*
    @type {boolean}
  ###
  completed: false

  ###*
    @type {boolean}
  ###
  editing: false

  toggle: ->
    @completed = !@completed
