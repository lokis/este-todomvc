/** @jsx React.DOM */
goog.provide('app.todos.react.Header');

goog.require('goog.events.KeyCodes');

/**
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Header = function(store) {

  this.reactClass = React.createClass({displayName: 'reactClass',

    render: function() {
      return (
        React.DOM.header( {id:"header"}, 
          React.DOM.h1(null, "todos"),
          React.DOM.input(
            {id:"new-todo",
            onKeyDown:this.onNewTodoKeyDown,
            placeholder:"What needs to be done?",
            ref:"input"} )
        )
      );
    },

    componentDidMount: function() {
      this.refs['input'].getDOMNode().focus();
    },

    onNewTodoKeyDown: function(e) {
      if (e.which != goog.events.KeyCodes.ENTER) return;
      var input = e.target;
      var title = input.value.trim();
      if (!title) return;
      store.add(title);
      input.value = '';
    }

  });
};