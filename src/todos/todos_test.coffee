suite 'app.todos.Todos', ->

  Todos = app.todos.Todos

  todos = null

  setup ->
    todos = new Todos

  createTodo = (props) ->
    todo = new app.todos.Todo
    goog.mixin todo, props
    todo

  suite 'constructor', ->
    test 'should set items to empty array', ->
      assert.deepEqual todos.items, []

  suite 'add', ->
    test 'should add new Todo', ->
      todos.add 'Foo'
      assert.lengthOf todos.items, 1
      assert.instanceOf todos.items[0], app.todos.Todo

  suite 'remaining', ->
    test 'should return uncompleted todos', ->
      completedTodo = createTodo completed: true
      uncompletedTodo = createTodo completed: false
      todos.items.push completedTodo
      todos.items.push uncompletedTodo
      assert.equal todos.remaining().length, 1
      assert.deepEqual todos.remaining()[0], uncompletedTodo

  suite 'completed', ->
    test 'should return completed todos', ->
      completedTodo = createTodo completed: true
      uncompletedTodo = createTodo completed: false
      todos.items.push completedTodo
      todos.items.push uncompletedTodo
      assert.equal todos.completed().length, 1
      assert.deepEqual todos.completed()[0], completedTodo

  suite 'setAllCompleted', ->
    test 'should set completed for all todos', ->
      completedTodo = createTodo completed: true
      todos.items.push completedTodo
      todos.setAllCompleted true
      assert.isTrue todos.items[0].completed
      todos.setAllCompleted false
      assert.isFalse todos.items[0].completed

  suite 'clearCompleted', ->
    test 'should remove completed', ->
      todos.items.push createTodo completed: true
      todos.items.push createTodo completed: false
      todos.clearCompleted()
      assert.equal todos.items.length, 1
      assert.isFalse todos.items[0].completed

  suite 'deserialize', ->
    test 'should deserialize todos', ->
      todos.items.push createTodo title: 'Bar'
      todos.deserialize
        items: [
          id: 123
          title: 'Foo'
        ]
      assert.equal todos.items.length, 1
      assert.instanceOf todos.items[0], app.todos.Todo
      assert.equal todos.items[0].id, 123
      assert.equal todos.items[0].title, 'Foo'

  suite 'serialize', ->
    test 'should serialize todos without editing state', ->
      todo = createTodo id: 123, title: 'Bar', editing: true
      todos.items.push todo
      object = todos.serialize()
      assert.equal object.items.length, 1
      assert.instanceOf object.items[0], app.todos.Todo
      assert.equal object.items[0].id, 123
      assert.equal object.items[0].title, 'Bar'
      assert.isFalse object.items[0].editing