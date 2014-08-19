goog.provide('app.todos.react.App');

/**
 * @param {app.todos.Store} store
 * @param {app.todos.react.Header} header
 * @param {app.todos.react.Main} main
 * @param {app.todos.react.Footer} footer
 * @constructor
 */
app.todos.react.App = function(store, header, main, footer) {

  this.component = React.createClass({
    render: function() {
      var atLeastOneTodoExists = !!store.all().length

      return (
        <div>
          <header.component />
          {atLeastOneTodoExists && <main.component />}
          {atLeastOneTodoExists && <footer.component />}
        </div>
      );
    }
  });
};
