/** @jsx React.DOM */
goog.provide('app.todos.react.App');

/**
 * @param {app.todos.Store} store
 * @param {app.todos.react.Header} reactHeader
 * @param {app.todos.react.Main} reactMain
 * @param {app.todos.react.Footer} reactFooter
 * @constructor
 */
app.todos.react.App = function(store, reactHeader, reactMain, reactFooter) {
  var Header = reactHeader.create;
  var Main = reactMain.create;
  var Footer = reactFooter.create;

  this.create = React.createClass({displayName: 'create',
    render: function() {
      var atLeastOneTodoExists = !!store.all().length

      return (
        React.DOM.div(null, 
          Header(null ),
          atLeastOneTodoExists && Main(null ),
          atLeastOneTodoExists && Footer(null )
        )
      );
    },

    componentDidMount: function(e) {
      store.listen(app.todos.Store.EventType.CHANGE, this.onStoreChange);
    },

    onStoreChange: function() {
      this.forceUpdate();
    }

  });
};