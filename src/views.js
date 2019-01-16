import { getFilters } from "../../Todo-App/src/filters";
import { getTodos, toggleTodo, saveTodos, removeTodo } from "./todos";

const todos = getTodos()

// Render Todos
const renderTodos = () => {
    const { searchText, hideCompleted } = getFilters()
    const filteredTodo = todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()))
    const incompleteTodos = filteredTodo.filter((todo) => !todo.completed)

    const hideCompletedTodos = filteredTodo.filter((todo) => {
        if (hideCompleted) {
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
            saveTodos()
            renderTodos()
        } else {
            todoToToggle.completed = true
            saveTodos()
            renderTodos()
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
        saveTodos()
        renderTodos()
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

export { renderTodos, generateLeftTodoSummary, generateTodoDOM }