/** @jsx React.DOM */
goog.provide('app.todos.react.App');

/**
 * @param {app.todos.Store} store
 * @param {app.todos.react.Header} header
 * @param {app.todos.react.Main} main
 * @param {app.todos.react.Footer} footer
 * @constructor
 */
app.todos.react.App = function(store, header, main, footer) {

  this.component = React.createClass({displayName: 'component',
    render: function() {
      var atLeastOneTodoExists = !!store.all().length

      return (
        React.DOM.div(null, 
          header.component(null), 
          atLeastOneTodoExists && main.component(null), 
          atLeastOneTodoExists && footer.component(null)
        )
      );
    }
  });
};
