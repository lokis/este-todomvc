goog.provide 'app.todos.react.Header'

class app.todos.react.Header

  ###*
    This is example how to use React with plain CoffeeScript syntax.
    @param {app.todos.Store} store
    @constructor
  ###
  constructor: (store) ->
    {header,h1,input} = React.DOM

    @component = React.createClass
      render: ->
        header id: 'header',
          h1 {}, 'todos'
          input
            id: 'new-todo'
            onKeyDown: @onNewTodoKeyDown
            placeholder: 'What needs to be done?'
            ref: 'newTodo'

      componentDidMount: ->
        @refs.newTodo.getDOMNode().focus()

      onNewTodoKeyDown: (e) ->
        return if e.key != 'Enter'
        @addTodo e.target

      addTodo: (input) ->
        title = input.value.trim()
        return if !title
        store.add title
        input.value = ''
