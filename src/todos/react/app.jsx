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

  this.create = React.createClass({
    render: function() {
      var atLeastOneTodoExists = !!store.all().length

      return (
        <div>
          <Header />
          {atLeastOneTodoExists && <Main />}
          {atLeastOneTodoExists && <Footer />}
        </div>
      );
    },

    componentDidMount: function() {
      store.listen(app.todos.Store.EventType.CHANGE, this.onStoreChange);
    },

    onStoreChange: function() {
      this.forceUpdate();
    }

  });
};