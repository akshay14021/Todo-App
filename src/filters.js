const filters = {
    searchText: '',
    hideCompleted: false
}

const getFilters = () => {
    return filters
}

const setFilters = (updates) => {
    if (typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText
    } else {
        filters.hideCompleted = updates.hideCompleted
    }
}

export { getFilters, setFilters }