/** @jsx React.DOM */
goog.provide('app.todos.react.Footer');

goog.require('goog.i18n.pluralRules');

/**
 * @param {app.todos.Store} store
 * @param {app.Routes} routes
 * @constructor
 */
app.todos.react.Footer = function(store, routes) {

  this.create = React.createClass({displayName: 'create',

    render: function() {
      var completedLength = store.completed().length;
      var remainingLength = store.remaining().length;

      return (
        React.DOM.footer( {id:"footer"}, 
          React.DOM.span( {id:"todo-count"}, 
            React.DOM.strong(null, remainingLength),
            ' ',
            this.getItemsLeftLocalized(remainingLength)
          ),
          React.DOM.ul( {id:"filters"}, 
            React.DOM.li(null, 
              React.DOM.a(
                {className:this.getClassName(routes.allTodos),
                href:routes.allTodos.createUrl()}
              , "All")
            ),
            React.DOM.li(null, 
              React.DOM.a(
                {className:this.getClassName(routes.activeTodos),
                href:routes.activeTodos.createUrl()}
              , "Active")
            ),
            React.DOM.li(null, 
              React.DOM.a(
                {className:this.getClassName(routes.completedTodos),
                href:routes.completedTodos.createUrl()}
              , "Completed")
            )
          ),
          
            !!completedLength &&
            React.DOM.button(
              {id:"clear-completed",
              onClick:this.onClearCompletedClick}
            , "Clear completed (",completedLength,")")
          
        )
      );
    },

    componentDidMount: function() {
      this.enablePointerEvents();
    },

    // Polymer PointerEvents for fast click on touch devices. React does not
    // support touch-action attribute, so we have to set it manually.
    enablePointerEvents: function() {
      var anchors = this.getDOMNode().querySelectorAll('#filters a');
      for (var i = 0; i < anchors.length; i++) {
        // Polymer's special attribute to enable PointerEvents.
        anchors[i].setAttribute('touch-action', 'none');
      }
    },

    /**
      @param {number} remainingLength
      @return {string}
    */
    getItemsLeftLocalized: function(remainingLength) {
      var rule = goog.i18n.pluralRules.select(remainingLength);
      switch(rule) {
        case goog.i18n.pluralRules.Keyword.ONE:
          return 'item left';
        case goog.i18n.pluralRules.Keyword.OTHER:
          return 'items left';
        default:
          throw new Error('Translation not defined.');
      }
    },

    getClassName: function(route) {
      return routes.getActive() == route && 'selected';
    },

    onClearCompletedClick: function(e) {
      store.clearCompleted();
    }

  });
};