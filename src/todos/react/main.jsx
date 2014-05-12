goog.provide('app.todos.react.Main');

/**
 * @param {app.todos.react.Todo} reactTodo
 * @param {app.Routes} routes
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Main = function(reactTodo, routes, store) {
  var Todo = reactTodo.reactClass;

  this.reactClass = React.createClass({

    render: function() {
      return (
        <section id="main">
          <input
            checked={!store.remaining().length}
            id="toggle-all"
            onChange={this.onToggleAllChange}
            type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul id="todo-list">
            {this.getTodosFilteredByUrl().map(function(todo) {
              return <Todo todo={todo} key={todo.id} />;
            })}
          </ul>
        </section>
      );
    },

    onToggleAllChange: function(e) {
      store.setAllCompleted(e.target.checked);
    },

    getTodosFilteredByUrl: function() {
      switch(routes.getActive()) {
        case routes.activeTodos:
          return store.remaining();
        case routes.completedTodos:
          return store.completed();
        default:
          return store.all();
      }
    }

  });

};