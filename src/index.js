import { createTodo, saveTodos } from "./todos";
import { setFilters } from "./filters";
import { renderTodos } from "./views";


renderTodos()

document.querySelector('#filter-todo').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#todo-form').addEventListener('submit', (e) => {
    e.preventDefault()
        createTodo(e.target.elements.todoText.value.trim())
        saveTodos()
        e.target.elements.todoText.value = ''
        renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})