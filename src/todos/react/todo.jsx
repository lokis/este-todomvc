goog.provide('app.todos.react.Todo');

/**
 * @param {app.todos.Store} store
 * @constructor
 */
app.todos.react.Todo = function(store) {

  this.component = React.createClass({

    render: function() {
      var todo = this.props.todo;
      var liClassName = React.addons.classSet({
        'editing': todo.editing,
        'completed': todo.completed
      });

      return (
        <li className={liClassName} key={todo.id}>
          <div className="view">
            <input
              checked={todo.completed}
              className="toggle"
              onChange={this.onToggleChange.bind(this, todo)}
              type="checkbox" />
            <label
              onDoubleClick={this.onLabelDoubleClick.bind(this, todo)}>
              {todo.title}
            </label>
            <button className="destroy"
              onClick={this.onDestroyClick.bind(this, todo)}>
            </button>
          </div>
          <input
            className="edit"
            defaultValue={todo.title}
            onBlur={this.onEditBlur.bind(this, todo)}
            onKeyDown={this.onEditKeyDown.bind(this, todo)}
            ref="edit"
          />
        </li>
      );
    },

    /**
      @param {app.todos.Todo} todo
    */
    onToggleChange: function(todo) {
      store.toggle(todo);
    },

    /**
      @param {app.todos.Todo} todo
    */
    onLabelDoubleClick: function(todo) {
      store.setEditing(todo, true);
      setTimeout(this.focusEdit, 0);
    },

    focusEdit: function() {
      this.refs.edit.getDOMNode().focus();
    },

    /**
      @param {app.todos.Todo} todo
    */
    onDestroyClick: function(todo) {
      store.remove(todo);
    },

    /**
      @param {app.todos.Todo} todo
    */
    onEditBlur: function(todo, e) {
      this.saveTodo(todo, e.target.value);
    },

    /**
      @param {app.todos.Todo} todo
    */
    onEditKeyDown: function(todo, e) {
      switch (e.key) {
        case 'Escape':
          e.target.value = todo.title;
          store.setEditing(todo, false);
          break;
        case 'Enter':
          this.saveTodo(todo, e.target.value);
          break;
      }
    },

    /**
      @param {app.todos.Todo} todo
      @param {string} title
    */
    saveTodo: function(todo, title) {
      title = title.trim();
      if (!title) {
        store.remove(todo);
        return;
      }
      store.setTitle(todo, title);
      store.setEditing(todo, false);
    }

  });

};
