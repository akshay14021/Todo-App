import uuidv4 from 'uuid/v4'

// Get saved data from storage
const loadTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    try {
        return todoJSON !== null ? JSON.parse(todoJSON) : []
    } catch (error) {
        return []
    }
}

let todos = loadTodos()

const getTodos = () => {
    return todos
}

// Save todos in local storage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Remove note from the list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }
}

// Toggle the completed value of todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    return todo
}

const createTodo = (text) => {
    todos.push({
        id: uuidv4(),
        text: text,
        completed: false
    })
}

export { getTodos, saveTodos, createTodo, toggleTodo, removeTodo }