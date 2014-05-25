goog.provide('app.todos.react.Header');

goog.require('goog.events.KeyCodes');

/**
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Header = function(store) {

  this.create = React.createClass({

    render: function() {
      return (
        <header id="header">
          <h1>todos</h1>
          <input
            id="new-todo"
            onKeyDown={this.onNewTodoKeyDown}
            placeholder="What needs to be done?"
            ref="input" />
        </header>
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