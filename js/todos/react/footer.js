/** @jsx React.DOM */
goog.provide('app.todos.react.Footer');

goog.require('goog.i18n.pluralRules');

/**
 * @param {app.todos.Store} store
 * @param {app.Routes} routes
 * @constructor
 */
app.todos.react.Footer = function(store, routes) {

  this.component = React.createClass({displayName: 'component',

    render: function() {
      var completedLength = store.completed().length;
      var remainingLength = store.remaining().length;

      return (
        React.DOM.footer({id: "footer"}, 
          React.DOM.span({id: "todo-count"}, 
            React.DOM.strong(null, remainingLength), 
            ' ', 
            this.getItemsLeftLocalized(remainingLength)
          ), 
          React.DOM.ul({id: "filters"}, 
            React.DOM.li(null, 
              React.DOM.a({
                className: this.getClassName(routes.allTodos), 
                href: routes.allTodos.url()
              }, "All")
            ), 
            React.DOM.li(null, 
              React.DOM.a({
                className: this.getClassName(routes.activeTodos), 
                href: routes.activeTodos.url()
              }, "Active")
            ), 
            React.DOM.li(null, 
              React.DOM.a({
                className: this.getClassName(routes.completedTodos), 
                href: routes.completedTodos.url()
              }, "Completed")
            )
          ), 
          
            !!completedLength &&
            React.DOM.button({
              id: "clear-completed", 
              onClick: this.onClearCompletedClick
            }, "Clear completed (", completedLength, ")")
          
        )
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

  });
};
