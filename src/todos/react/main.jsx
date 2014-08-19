goog.provide('app.todos.react.Main');

/**
 * @param {app.todos.react.Todo} todo
 * @param {app.Routes} routes
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Main = function(todo, routes, store) {

  var Todo = todo.component;

  this.component = React.createClass({

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
      switch(routes.active) {
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
