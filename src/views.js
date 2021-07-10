import { removeNote, updateNote, sortNotes } from "./note"
import { DateTime } from "luxon"
import { getFilters } from "./filters"

//Returns a P element with the name of a note element on a list
const generateNotes = (value) => {
    //Create nesesary elements for a note element
    const container = document.createElement('div')
    const topContainer = document.createElement('div')
    const optionsContainer = document.createElement('div')
    const noteBody = document.createElement('div')
    const noteText = document.createElement('div')
    const lastEdited = document.createElement('span')
    const noteTitle = document.createElement('a')
    const removeButton = document.createElement('div')
    const editButton = document.createElement('div')

    //note edit inputs
    const editNoteText = document.createElement('textarea')
    const editNoteTitle = document.createElement('input')

    //note edit buttons
    const editButtonsWrapper = document.createElement('div')
    const aceptBtn = document.createElement('button')
    const cancelBtn = document.createElement('button')

    //Set option Icons
    const editIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
  </svg>`
    const icon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500 hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>`

    //Set element classes
    const optionsContainerClass = ['flex', 'space-x-4', 'items-center', 'ml-4']
    const noteContainer = ['bg-white', 'shadow-sm', 'p-4', 'transition-shadow', 'hover:shadow-lg', 'duration-300', 'ease-out']
    const topClass = ['flex', 'items-start', 'justify-between']
    const noteBodyClass = ['text-gray-700', 'mt-4']
    const lastEditedClass = ['text-sm', 'italic', 'text-gray-400']
    const cursorEdit = ['cursor-pointer', 'hover:bg-gray-100', 'rounded-full', 'p-1', 'text-gray-500', 'hover:text-blue-500']
    const cursorRemove = ['cursor-pointer', 'hover:bg-gray-100', 'rounded-full', 'p-1', 'text-gray-500', 'hover:text-red-500']
    const title = ['text-gray-800', 'text-2xl', 'font-semibold', 'hover:text-indigo-500', 'cursor-pointer']
    const noteTextClass = ['bg-gray-50', 'p-2', 'rounded', 'text-gray-600']

    //Edit inputs Classes
    const editNoteTextClass = [
        'shadow-sm',
        'bg-gray-50',
        'focus:bg-white',
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        'mt-1',
        'block',
        'w-full',
        'sm:text-sm',
        'border',
        'border-gray-300',
        'rounded-md']
    const editNoteTitleClass = [
        'focus:ring-indigo-500',
        'focus:border-indigo-500',
        'block',
        'w-full',
        'shadow-sm',
        'sm:text-2xl',
        'font-semibold',
        'border-gray-300',
        'rounded-md']

    //Edit buttons Classes
    const editButtonsWrapperClass = ['flex', 'space-x-4', 'justify-end', 'mt-4']
    const aceptBtnClass = [
        'inline-flex',
        'justify-center',
        'py-2',
        'px-4',
        'border',
        'border-transparent',
        'shadow-sm',
        'font-medium',
        'rounded-md',
        'text-white',
        'bg-green-500',
        'hover:bg-green-400',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-green-400']
    const cancelBtnClass = [
        'inline-flex',
        'justify-center',
        'py-2',
        'px-4',
        'border',
        'border-transparent',
        'font-medium',
        'rounded-md',
        'hover:bg-gray-100',
        'focus:outline-none']

    //add clases to DOM elements
    container.classList.add(...noteContainer)
    optionsContainer.classList.add(...optionsContainerClass)
    noteBody.classList.add(...noteBodyClass)
    noteTitle.classList.add(...title)
    removeButton.classList.add(...cursorRemove)
    editButton.classList.add(...cursorEdit)
    topContainer.classList.add(...topClass)
    lastEdited.classList.add(...lastEditedClass)
    noteText.classList.add(...noteTextClass)

    //add clases to the Edit DOM elements
    editNoteText.classList.add(...editNoteTextClass)
    editNoteTitle.classList.add(...editNoteTitleClass)

    editButtonsWrapper.classList.add(...editButtonsWrapperClass)
    aceptBtn.classList.add(...aceptBtnClass)
    cancelBtn.classList.add(...cancelBtnClass)

    //set edit atributes
    editNoteText.setAttribute('placeholder', 'Empty note :(')
    editNoteText.setAttribute('rows', '4')

    editNoteTitle.setAttribute('type', 'text')

    //set the last edited value
    lastEdited.innerHTML = lastUpdated(value)
    //set the note body
    value.body === '' ? noteText.innerHTML = 'Empty note :(' : noteText.innerHTML = value.body

    //set the note for edition
    editNoteText.value = value.body
    cancelBtn.innerHTML = 'Cancel'
    aceptBtn.innerHTML = 'Acept'
    editButtonsWrapper.append(cancelBtn, aceptBtn)

    //Append items to the note headder
    topContainer.appendChild(noteTitle)
    optionsContainer.append(editButton, removeButton)
    topContainer.append(optionsContainer)

    //Append textArea to NoteBody
    noteBody.appendChild(noteText)

    //Checks if the element contains a title and adds it to the span element, if not, adds a default text
    value.title.length > 0 ? noteTitle.textContent = value.title : noteTitle.textContent = 'Unnamed note'

    //Setup remove button
    removeButton.innerHTML = icon
    editButton.innerHTML = editIcon

    removeButton.addEventListener('click', () => {
        removeNote(value.id)
        renderNotes()
    })

    noteTitle.addEventListener('click', () => editNote({
        value,
        noteTitle,
        optionsContainer,
        noteText,
        topContainer,
        noteBody,
        editNoteTitle,
        editNoteText,
        editButtonsWrapper
    }))

    //Setup edit button
    editButton.addEventListener('click', () => editNote({
        value,
        noteTitle,
        optionsContainer,
        noteText,
        topContainer,
        noteBody,
        editNoteTitle,
        editNoteText,
        editButtonsWrapper
    }))

    //Acept edit button function
    aceptBtn.addEventListener('click', (e) => {
        e.preventDefault()
        updateNote(value.id,{
            title: editNoteTitle.value,
            body: editNoteText.value
        })
        lastEdited.innerHTML = lastUpdated(value)
        renderNotes()
    })

    cancelBtn.addEventListener('click', () => cancelEdit({ 
        noteTitle, 
        optionsContainer, 
        noteText,
        topContainer, 
        noteBody, 
        editNoteTitle, 
        editNoteText,
        editButtonsWrapper, 
    }))

    // container.appendChild(noteTitle)
    container.appendChild(topContainer)
    container.appendChild(lastEdited)
    container.appendChild(noteBody)

    return container
}

//Renders the notelist to the DOM
const renderNotes = () => {
    //Filters the array by the "hide completed" filter and checks if the element contains the word we are looking for
    const noteList = document.querySelector('#notes-list')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filteredNotes = notes.filter((value) => {
    return filters.hideCompleted && value.completed ? false : value.title.toLowerCase().includes(filters.filterByTitle.toLowerCase())
    })
    //Clears the List div so that there won't be duplicate data
    noteList.innerHTML = ''
    //Generate all of the list elements and shows them on screen
    if(filteredNotes.length > 0){
        filteredNotes.forEach((value) => {
            const note = generateNotes(value)
            noteList.appendChild(note)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show :('
        emptyMessage.classList.add('text-3xl', 'font-semibold', 'text-gray-500')
        noteList.appendChild(emptyMessage)
    }
}

//Function to know when the note was last updated
const lastUpdated = (element) => {
    let now = DateTime.local()
    let lastUpdated = DateTime.fromISO(element.updatedAt)
    let diff = now.diff(lastUpdated, ['months', 'days', 'hours', 'minutes', 'seconds']).toObject()
    if (diff.months > 0) {
        return `last updated: ${diff.months} months - ${diff.days} days ago`
    } else if (diff.days > 0) {
        return `last updated: ${diff.days} days - ${diff.hours} hours ago`
    } else if (diff.hours > 0) {
        return `last updated ${diff.hours} hours ago`
    } else if (diff.minutes > 0) {
        return `last updated ${diff.minutes} minutes ago`
    } else {
        return `last updated just now`
    }
}

const cancelEdit = ({ noteTitle, optionsContainer, noteText, topContainer, noteBody, editNoteTitle, editNoteText, editButtonsWrapper }) => {
    topContainer.removeChild(editNoteTitle, optionsContainer)
    topContainer.append(noteTitle, optionsContainer)
    noteBody.removeChild(editNoteText)
    noteBody.removeChild(editButtonsWrapper)
    noteBody.append(noteText)
}

const editNote = ({ noteTitle, optionsContainer, noteText, topContainer, noteBody, editNoteTitle, editNoteText, editButtonsWrapper, value }) => {
    editNoteText.value = value.body
    editNoteTitle.value = value.title
    noteTitle.remove()
    optionsContainer.remove()
    noteText.remove()
    //Add the edit inputs
    topContainer.append(editNoteTitle, optionsContainer)
    noteBody.append(editNoteText)
    //Add the edit buttons
    noteBody.append(editButtonsWrapper)
}

export {generateNotes, renderNotes, lastUpdated}