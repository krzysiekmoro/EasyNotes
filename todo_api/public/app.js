$(document).ready(() => {
    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress((event) => {
        if(event.which == 13){
            createTodo();
        }
    })

    $('.list').on('click', 'li', function(){
        upadateTodo($(this))
    })

    $('.list').on('click', 'span', function(e){
        e.stopPropagation()
        removeTodo($(this).parent())
    })
})

function addTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo){
    let newElement = $(`<li class="task">${todo.name}<span>X</span></li>`);
    newElement.data('id', todo._id);
    newElement.data('completed', todo.completed);
    if(todo.completed){
        newElement.addClass('done')
    }
    $('.list').append(newElement);
}

function createTodo(){
    const userInput = $('#todoInput').val();
    $.post('/api/todos', {name: userInput})
    .then((newTodo) => {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(err => console.log(err))
}

function removeTodo(todo){
    const clickedId = todo.data('id')
    const deleteUrl = `api/todos/${clickedId}`
    $.ajax({
        method: 'DELETE',
        url: deleteUrl
    })
    .then((data) => {
        todo.remove()
    })
}

function upadateTodo(todo){
    const updateUrl = `api/todos/${todo.data('id')}`
    const state = !todo.data('completed')
    const updateData = { completed: state }
    $.ajax({
        method: 'PUT',
        url: updateUrl,
        data: updateData
    })
    .then((updatedTodo) => {
        todo.toggleClass('done')
        todo.data('completed', state)
    })
}