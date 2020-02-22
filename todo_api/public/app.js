$(document).ready(() => {
    $.getJSON('/api/todos')
    .then(addTodos)

    $('#todoInput').keypress((event) => {
        if(event.which == 13){
            createTodo();
        }
    })
})

function addTodos(todos){
    todos.forEach(todo => {
        addTodo(todo);
    });
}

function addTodo(todo){
    if(todo.completed){
        $('.list').append(`<li class="done">${todo.name}</li>`)
    }else{
        $('.list').append(`<li class="task">${todo.name}</li>`)
    }
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
