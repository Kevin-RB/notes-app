import { DateTime } from "luxon"
import { v4 as uuidv4 } from 'uuid';

let notes = []

//Fetch existing data from local storage
const loadNotes = () => {
    const dataJSON = localStorage.getItem(`notes`)
    try {
        return dataJSON ? JSON.parse(dataJSON) : []
    } catch (error) {
        return []
    }
}

//Creates a new note
const createNote = (title, body) => {
    const id = uuidv4()
    const dateOfCreation = DateTime.now()
    notes.push({
        id: id,
        title,
        body,
        createdAt: dateOfCreation,
        updatedAt: dateOfCreation
    })
    saveNotes()
}

// Save data to localstorage
const saveNotes = () => {
    localStorage.setItem(`notes`, JSON.stringify(notes))
}

//Function that removes a Note element when clicked on it's button
const removeNote = (id) => {
    let index = notes.findIndex((value) => value.id === id)
    if (index !== -1) {
        notes.splice(index, 1)
        saveNotes()
    } else {
        console.log('Error (no se pudo encontrar el id de este elemento)')
    }
    saveNotes()
}

//Sorts the list by the selected filter and returns a new list
const sortNotes = (filter) => {
    if (filter === 'byEdited') {
        return notes.sort((a, b) => {
            const firstElement = DateTime.fromISO(a.updatedAt).valueOf()
            const secondElement = DateTime.fromISO(b.updatedAt).valueOf()
            if (firstElement > secondElement) {
                return -1
            } else if (firstElement < secondElement) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filter === 'byCreated') {
        return notes.sort((a, b) => {
            const firstElement = DateTime.fromISO(a.createdAt).valueOf()
            const secondElement = DateTime.fromISO(b.createdAt).valueOf()
            if (firstElement > secondElement) {
                return -1
            } else if (firstElement < secondElement) {
                return 1
            } else {
                return 0
            }
        })
    } else if (filter === 'alphabetical') {
        return notes.sort((a, b) => {
            const firstElement = a.title.toLowerCase()
            const secondElement = b.title.toLowerCase()
            if (firstElement > secondElement) {
                return 1
            } else if (firstElement < secondElement) {
                return -1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

const updateNote = (id, updates) => {
    const note = notes.find((note) => note.id === id)

    if(!note){
        return
    }

    if(typeof updates.title === 'string'){
        note.title = updates.title
        note.updatedAt = DateTime.now()
    }

    if(typeof updates.body === 'string'){
        note.body = updates.body
        note.updatedAt = DateTime.now()
    }
    saveNotes()
}

const getNotes = () => notes
notes = loadNotes()

export { createNote, getNotes, removeNote, sortNotes, updateNote}