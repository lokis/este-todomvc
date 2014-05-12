// Generated by github.com/steida/coffee2closure 0.1.3
goog.provide('app.todos.Store');
goog.provide('app.todos.Store.EventType');
goog.require('app.todos.Todo');
goog.require('goog.array');
goog.require('goog.events.EventTarget');

/**
  @param {app.todos.Todos} todos
  @param {app.LocalStorage} localStorage
  @param {app.Routes} routes
  @constructor
  @extends {goog.events.EventTarget}
  @final
 */
app.todos.Store = function(todos, localStorage, routes) {
  this.todos = todos;
  this.localStorage = localStorage;
  app.todos.Store.superClass_.constructor.call(this);
  this.deserialize_();
  routes.listen(app.Routes.EventType.CHANGE, (function(_this) {
    return function() {
      return _this.notify_();
    };
  })(this));
}
goog.inherits(app.todos.Store, goog.events.EventTarget);

/**
  @enum {string}
 */
app.todos.Store.EventType = {
  CHANGE: 'change'
};

/**
  @private
 */
app.todos.Store.prototype.deserialize_ = function() {
  var localTodos;
  localTodos = this.localStorage.loadTodos();
  if (localTodos) {
    return this.todos.deserialize(localTodos);
  }
};

/**
  @private
 */
app.todos.Store.prototype.serialize_ = function() {
  return this.localStorage.saveTodos(this.todos.serialize());
};

/**
  @private
 */
app.todos.Store.prototype.notify_ = function() {
  this.serialize_();
  return this.dispatchEvent(app.todos.Store.EventType.CHANGE);
};

/**
  @param {string} title
 */
app.todos.Store.prototype.add = function(title) {
  this.todos.add(title);
  return this.notify_();
};

/**
  @return {Array.<app.todos.Todo>}
 */
app.todos.Store.prototype.all = function() {
  return this.todos.items;
};

/**
  @return {Array.<app.todos.Todo>}
 */
app.todos.Store.prototype.remaining = function() {
  return this.todos.remaining();
};

/**
  @return {Array.<app.todos.Todo>}
 */
app.todos.Store.prototype.completed = function() {
  return this.todos.completed();
};

/**
  @param {boolean} completed
 */
app.todos.Store.prototype.setAllCompleted = function(completed) {
  this.todos.setAllCompleted(completed);
  return this.notify_();
};

/**
  @param {app.todos.Todo} todo
 */
app.todos.Store.prototype.toggle = function(todo) {
  todo.toggle();
  return this.notify_();
};

/**
  @param {app.todos.Todo} todo
  @param {boolean} enable
 */
app.todos.Store.prototype.setEditing = function(todo, enable) {
  todo.editing = enable;
  return this.notify_();
};

/**
  @param {app.todos.Todo} todo
  @param {string} title
 */
app.todos.Store.prototype.setTitle = function(todo, title) {
  todo.title = title;
  return this.notify_();
};

/**
  @param {app.todos.Todo} todo
 */
app.todos.Store.prototype.remove = function(todo) {
  goog.array.remove(this.todos.items, todo);
  return this.notify_();
};
app.todos.Store.prototype.clearCompleted = function() {
  this.todos.clearCompleted();
  return this.notify_();
};