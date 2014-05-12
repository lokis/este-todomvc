suite 'app.todos.Todo', ->

  Todo = app.todos.Todo

  todo = null

  setup ->
    todo = new Todo

  suite 'constructor', ->
    test 'should set empty title', ->
      assert.equal todo.title, ''

    test 'should set title', ->
      todo = new Todo 'Foo'
      assert.equal todo.title, 'Foo'

    test 'should set random id', ->
      todo = new Todo 'Foo', -> "123"
      assert.isString todo.id
      assert.equal todo.id, 123

    test 'should set editing to false', ->
      assert.isFalse todo.editing

    test 'should set completed to false', ->
      assert.isFalse todo.completed

  suite 'toggle', ->
    test 'should set completed to true then false', ->
      todo.toggle()
      assert.isTrue todo.completed
      todo.toggle()
      assert.isFalse todo.completed