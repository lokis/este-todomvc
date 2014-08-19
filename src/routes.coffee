goog.provide 'app.Routes'

goog.require 'este.Routes'

class app.Routes extends este.Routes

  ###*
    @constructor
    @extends {este.Routes}
  ###
  constructor: ->
    @allTodos = @route '/'
    @activeTodos = @route '/active'
    @completedTodos = @route '/completed'
