import {getNotes, createNote, removeNote, updateNote} from './note'
import {getFilters, setFilters} from './filters'
import {renderNotes} from './views'

renderNotes()


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

const newNoteTitle = document.querySelector('#new-note-title')
const newNoteBody = document.querySelector('#new-note-body')

document.querySelector('#add-note').addEventListener('click', () => {
    newNoteTitle.value = ''
    newNoteBody.value = ''
    toggleModal()
})

document.querySelector('#create-btn').addEventListener('click', () => {
    createNote(newNoteTitle.value, newNoteBody.value)
    renderNotes()
    toggleModal()
})

document.querySelector('#filter-notes').addEventListener('input', (e) => {
    setFilters({filterByTitle: e.target.value}) 
    renderNotes()
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
    setFilters({sortBy: e.target.value}) 
    renderNotes()
})
