const notes = getSavedDataFrom('notes')

const filters = {
    filterByTitle: '',
    sortBy: 'byEdited'
}
const editHudState = {
    selfIsOpened: false,
}

renderNotes(notes, filters)

document.querySelector('#filter-notes').addEventListener('input', (e) => {
    filters.filterByTitle = e.target.value
    renderNotes(notes, filters)
})
const overlay = document.querySelector('#overlay')

const toggleModal = () => {
    overlay.classList.toggle('hidden')
    overlay.classList.toggle('flex')
    overlay.classList.toggle('bg-black')
    overlay.classList.toggle('bg-opacity-50')
}

document.querySelector('#cancel-btn').addEventListener('click', () => {
    toggleModal()
})


// document.querySelector('#add-note').addEventListener('click', () => {
//     // const id = uuidv4()
//     // const dateOfCreation = dateNow()
//     // notes.push({
//     //     id: id,
//     //     title: '',
//     //     body: '',
//     //     createdAt: dateOfCreation,
//     //     updatedAt: dateOfCreation
//     // })
//     // saveDataIn('notes', notes)
//     // location.assign(`./edit.html#${id}`)
//     toggleModal()
// })

const newNoteTitle = document.querySelector('#new-note-title')
const newNoteBody = document.querySelector('#new-note-body')

document.querySelector('#add-note').addEventListener('click', () => {
    newNoteTitle.value = ''
    newNoteBody.value = ''
    toggleModal()
})

document.querySelector('#create-btn').addEventListener('click', () => {
    const id = uuidv4()
    const dateOfCreation = dateNow()
    notes.push({
        id: id,
        title: newNoteTitle.value,
        body: newNoteBody.value,
        createdAt: dateOfCreation,
        updatedAt: dateOfCreation
    })
    saveDataIn('notes', notes)
    renderNotes(notes, filters)
    // location.assign(`./index.html`)
    toggleModal()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        const newData = JSON.parse(e.newValue)
        renderNotes(newData, filters)
    }
})
