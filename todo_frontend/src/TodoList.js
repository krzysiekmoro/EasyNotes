import React, {Component} from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import * as apiCalls from './apiCalls';

class TodoList extends Component{
    constructor(props){
        super(props);
        this.state = {
            todos: []
        }
        this.addTodo = this.addTodo.bind(this);
    }

    async componentDidMount(){
        let todos = await apiCalls.getTodos();
        this.setState({todos});
    }

    async addTodo(val){
        let newTodo = await apiCalls.createTodo(val);
        this.setState({todos: [...this.state.todos, newTodo]});
    }

    async deleteTodo(id){
        await apiCalls.removeTodo(id);
        const todos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: todos});
    }

    async toggleTodo(todo){
        let updatedTodo = await apiCalls.updateTodo(todo);
        const todos = this.state.todos.map(todo => 
            (todo._id === updatedTodo._id)
            ? {...todo, completed: !todo.completed}
            : todo
            );
        this.setState({todos: todos});
    }

    render(){
        const todos = this.state.todos.map(todo => (
            <Todo 
                key={todo._id} 
                {...todo} 
                onDelete={this.deleteTodo.bind(this, todo._id)} 
                onToggle={this.toggleTodo.bind(this, todo)}
            />
        ))
        return(
            <div>
                <h1>Todo List!</h1>
                <TodoForm addTodo={this.addTodo} />
                {todos}
            </div>
        )
    }
}

export default TodoList;