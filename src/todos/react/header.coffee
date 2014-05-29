###
  @fileoverview This is example how to use React with CoffeeScript syntax.
###
goog.provide 'app.todos.react.Header'

goog.require 'goog.events.KeyCodes'

class app.todos.react.Header

  ###*
    @param {app.todos.Store} store
    @constructor
  ###
  constructor: (store) ->
    {header,h1,input} = React.DOM

    @create = React.createClass
      render: ->
        header id: 'header',
          h1 null, 'todos'
          input
            id: 'new-todo'
            onKeyDown: @onNewTodoKeyDown
            placeholder: 'What needs to be done?'
            ref: 'newTodo'

      componentDidMount: ->
        @refs['newTodo'].getDOMNode().focus()

      onNewTodoKeyDown: (e) ->
        return if e.which != goog.events.KeyCodes.ENTER
        @addTodo e.target

      addTodo: (input) ->
        title = input.value.trim()
        return if !title
        store.add title
        input.value = ''