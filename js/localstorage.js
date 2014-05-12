// Generated by github.com/steida/coffee2closure 0.1.3
goog.provide('app.LocalStorage');
goog.require('goog.storage.Storage');
goog.require('goog.storage.mechanism.mechanismfactory');

/**
  @constructor
  @final
 */
app.LocalStorage = function() {
  this.createStorage_();
}

/**
  @enum {string}
 */
app.LocalStorage.Keys = {
  TODOS: 'todos-este'
};

/**
  @type {goog.storage.Storage}
  @private
 */
app.LocalStorage.prototype.storage_ = null;

/**
  @private
 */
app.LocalStorage.prototype.createStorage_ = function() {
  var mechanism;
  mechanism = goog.storage.mechanism.mechanismfactory.createHTML5LocalStorage();
  if (!mechanism) {
    throw new Error('HTML5 Local Storage is not available.');
  }
  return this.storage_ = new goog.storage.Storage(mechanism);
};

/**
  @return {*}
 */
app.LocalStorage.prototype.loadTodos = function() {
  return this.storage_.get(app.LocalStorage.Keys.TODOS);
};

/**
  @param {app.todos.Todos} todos
 */
app.LocalStorage.prototype.saveTodos = function(todos) {
  return this.storage_.set(app.LocalStorage.Keys.TODOS, todos);
};