'use strict'

// Get saved data from storage
const getSavedData = () => {
    const todoJSON = localStorage.getItem('todos')

    try {
        return todoJSON !== null ? JSON.parse(todoJSON) : []
    } catch (error) {
        return []
    }
}

// Save todos in local storage
const saveTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

// Render Todos
const renderTodos = (todos, filters) => {
    const filteredTodo = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    const incompleteTodos = filteredTodo.filter((todo) => !todo.completed)

    const hideCompletedTodos = filteredTodo.filter((todo) => {
        if (filters.hideCompleted) {
            return !todo.completed
        } else {
            return true
        }
    })

    document.querySelector('#todos-list').innerHTML = ''
    document.querySelector('#todos-list').appendChild(generateLeftTodoSummary(incompleteTodos))

    if (todos.length > 0) {
        hideCompletedTodos.forEach((todo) => {
            const todoElement = generateTodoDOM(todo)
            document.querySelector('#todos-list').appendChild(todoElement)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-dos to show'
        document.querySelector('#todos-list').appendChild(emptyMessage)
    }
}

// Generate todo DOM
const generateTodoDOM = (todo) => {
    const todoElement = document.createElement('span')
    const checkBoxElement = document.createElement('input')
    const divElement = document.createElement('label')
    const buttonElement = document.createElement('button')
    const containerElement = document.createElement('div')
    
    // Checkbox Setup
    checkBoxElement.setAttribute('type', 'checkbox')
    if (todo.completed === true) {
        checkBoxElement.checked = true
    }
    containerElement.appendChild(checkBoxElement)
    checkBoxElement.addEventListener('change', () => {
        const todoToToggle = toggleTodo(todo.id)
        if (checkBoxElement.checked === false) {
            todoToToggle.completed = false
            saveTodos(todos, filters)
            renderTodos(todos, filters)
        } else {
            todoToToggle.completed = true
            saveTodos(todos, filters)
            renderTodos(todos, filters)
        }
    })

    
    //Setup container
    divElement.classList.add('list-item')
    containerElement.classList.add('list-item__container')
    divElement.appendChild(containerElement)

    // Button setup
    buttonElement.textContent = 'remove'
    buttonElement.classList.add('button', 'button--text')
    divElement.appendChild(buttonElement)
    buttonElement.addEventListener('click', (e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })

    // Todo list setup
    todoElement.textContent = todo.text
    containerElement.appendChild(todoElement)

    return divElement
}

// Generate left todo summary 
const generateLeftTodoSummary = (incompleteTodos) => {
    const summary = document.createElement('h2')
    if (incompleteTodos.length === 1) {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    }
    summary.classList.add('list-title')
    return summary
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