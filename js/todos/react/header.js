// Generated by github.com/steida/coffee2closure 0.1.9
goog.provide('app.todos.react.Header');

/**
  This is example how to use React with plain CoffeeScript syntax.
  @param {app.todos.Store} store
  @constructor
 */
app.todos.react.Header = function(store) {
  var h1, header, input, _ref;
  _ref = React.DOM, header = _ref.header, h1 = _ref.h1, input = _ref.input;
  this.component = React.createFactory(React.createClass({
    render: function() {
      return header({
        id: 'header'
      }, h1({}, 'todos'), input({
        id: 'new-todo',
        onKeyDown: this.onNewTodoKeyDown,
        placeholder: 'What needs to be done?',
        ref: 'newTodo'
      }));
    },
    componentDidMount: function() {
      return this.refs.newTodo.getDOMNode().focus();
    },
    onNewTodoKeyDown: function(e) {
      if (e.key !== 'Enter') {
        return;
      }
      return this.addTodo(e.target);
    },
    addTodo: function(input) {
      var title;
      title = input.value.trim();
      if (!title) {
        return;
      }
      store.add(title);
      return input.value = '';
    }
  }));
}