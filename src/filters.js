const filters = {
    filterByTitle: '',
    sortBy: 'byEdited'
}

const getFilters = () => filters

const setFilters = (updates) =>{
    if(typeof updates.filterByTitle === 'string'){
        filters.filterByTitle = updates.filterByTitle
    }
    if(typeof updates.sortBy === 'string'){
        filters.sortBy = updates.sortBy
    }
}

export {getFilters, setFilters}