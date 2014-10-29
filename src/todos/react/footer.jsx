goog.provide('app.todos.react.Footer');

goog.require('goog.i18n.pluralRules');

/**
 * @param {app.todos.Store} store
 * @param {app.Routes} routes
 * @constructor
 */
app.todos.react.Footer = function(store, routes) {

  this.component = React.createFactory(React.createClass({

    render: function() {
      var completedLength = store.completed().length;
      var remainingLength = store.remaining().length;

      return (
        <footer id="footer">
          <span id="todo-count">
            <strong>{remainingLength}</strong>
            {' '}
            {this.getItemsLeftLocalized(remainingLength)}
          </span>
          <ul id="filters">
            <li>
              <a
                className={this.getClassName(routes.allTodos)}
                href={routes.allTodos.url()}
              >All</a>
            </li>
            <li>
              <a
                className={this.getClassName(routes.activeTodos)}
                href={routes.activeTodos.url()}
              >Active</a>
            </li>
            <li>
              <a
                className={this.getClassName(routes.completedTodos)}
                href={routes.completedTodos.url()}
              >Completed</a>
            </li>
          </ul>
          {
            !!completedLength &&
            <button
              id="clear-completed"
              onClick={this.onClearCompletedClick}
            >Clear completed ({completedLength})</button>
          }
        </footer>
      );
    },

    getItemsLeftLocalized: function(remainingLength) {
      var rule = goog.i18n.pluralRules.select(remainingLength);
      switch(rule) {
        case goog.i18n.pluralRules.Keyword.ONE:
          return 'item left';
        case goog.i18n.pluralRules.Keyword.OTHER:
          return 'items left';
        default:
          throw Error('Translation not defined.');
      }
    },

    getClassName: function(route) {
      return routes.active == route && 'selected';
    },

    onClearCompletedClick: function(e) {
      store.clearCompleted();
    }

  }));
};
