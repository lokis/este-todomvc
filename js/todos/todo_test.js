// Generated by github.com/steida/coffee2closure 0.1.9
suite('app.todos.Todo', function() {
  var Todo, todo;
  Todo = app.todos.Todo;
  todo = null;
  setup(function() {
    return todo = new Todo;
  });
  suite('constructor', function() {
    test('should set empty title', function() {
      return assert.equal(todo.title, '');
    });
    test('should set title', function() {
      todo = new Todo('Foo');
      return assert.equal(todo.title, 'Foo');
    });
    test('should set random id', function() {
      todo = new Todo('Foo', function() {
        return "123";
      });
      assert.isString(todo.id);
      return assert.equal(todo.id, 123);
    });
    test('should set editing to false', function() {
      return assert.isFalse(todo.editing);
    });
    return test('should set completed to false', function() {
      return assert.isFalse(todo.completed);
    });
  });
  return suite('toggle', function() {
    return test('should set completed to true then false', function() {
      todo.toggle();
      assert.isTrue(todo.completed);
      todo.toggle();
      return assert.isFalse(todo.completed);
    });
  });
});