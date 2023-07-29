import { initialNotes, archivedNotes } from './data.js'
import { renderTable, renderSummaryTable } from './render.js'

const modal = document.getElementById('note_modal')
const openArchiveBtn = document.getElementById('open_archived_btn')
const createNoteButton = document.getElementById('create_note_btn')

let isActive = false 
let isEditMode = false 
let editNoteIndex = -1
let originalCreatedValue

//handlers

export function handleFormSubmit(event) {
  event.preventDefault()
    const formData = new FormData(modal)
    const name = formData.get('name')
    const created = formData.get('created')
    const category = formData.get('category')
    const content = formData.get('content')
    const dates = formData
      .get('dates')
      .split(',')
      .map((date) => date.trim())

    if (!isEditMode && (!name || !created || !category || !content || !dates)) {
      alert('Please fill in all fields.')
      return
    }

  let newNote = {
    name,
    created,
    category,
    content,
    dates
  }
   if (isEditMode && editNoteIndex !== -1) {
     newNote.created = created || modal.elements.created.dataset.originalValue
     initialNotes[editNoteIndex] = newNote
     isEditMode = false
     editNoteIndex = -1
    
   } else {
     initialNotes.push(newNote)
   }
  
  closeModal()
  renderTable(initialNotes)
}

function handleDeleteNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId
  if (noteIndex !== undefined) {
    initialNotes.splice(noteIndex, 1)
    renderTable(initialNotes)
  }
}

function handleArchiveNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId

  if (noteIndex !== undefined) {
    const archivedNote = initialNotes.splice(noteIndex, 1)[0]
    archivedNotes.push(archivedNote)
    renderTable(initialNotes)
    renderSummaryTable(
      getSummaryObj(initialNotes),
      getSummaryObj(archivedNotes)
    )
  }
}

function handleOpenArchivedBtn() {
  isActive = !isActive 

  if (isActive) {
    renderTable(archivedNotes)
    updateClassNames(['.table_edit_img', '.delete', '.archive'], 'hidden')
    updateClassNames(['.unarchive'], 'active')
    updateBtnText(
      '#open_archived_btn',
       isActive,
      'Back to Notes',
      'Open Archived'
      )
      addUnarchiveIconListeners()
  }  else {
    renderTable(initialNotes)
    updateClassNames(['.table_edit_img', '.delete', '.archive'], 'active')
    updateClassNames(['.unarchive'], 'hidden')
    updateBtnText(
      '#open_archived_btn',
      isActive,
      'Back to Notes',
      'Open Archived'
    )
  }
}

function handleUnarchiveNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId

  if (noteIndex !== undefined) {
    const unarchivedNote = archivedNotes.splice(noteIndex, 1)[0]
    initialNotes.push(unarchivedNote)
    renderTable(archivedNotes)
    renderSummaryTable(
      getSummaryObj(initialNotes),
      getSummaryObj(archivedNotes)
    )
  }
}

function handleEditNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId

  if (noteIndex !== undefined) {
    isEditMode = true
    editNoteIndex = parseInt(noteIndex, 10)
    const note = initialNotes[editNoteIndex]
    fillFormForEdit(note)
    openModal()
    updateBtnText('.table_input_btn', isEditMode, 'Update Note', 'Add Note')
  }
}

//helpers

export function getSummaryObj(notes) {
  let summaryObj = {}

  for (const note of notes) {
    const category = note.category
    if (!summaryObj[category]) {
      summaryObj[category] = { active: 0, archived: 0 }
    }
    if (archivedNotes.includes(note)) {
      summaryObj[category].archived++
    } else {
      summaryObj[category].active++
    }
  }
  return summaryObj
}

function openModal() {
  modal.style.display = 'flex'
  updateBtnText('.table_input_btn', false, 'Update Note', 'Add Note')
  const overlay = document.querySelector('.overlay')
  overlay.style.display = 'block'
}

function closeModal() {
  modal.style.display = 'none'
  const overlay = document.querySelector('.overlay')
  overlay.style.display = 'none'
}

function updateBtnText(selector, active, activeText, inactiveText) {
  const button = document.querySelector(selector)
  if (button) {
    button.textContent = active ? activeText : inactiveText
  }
}

function updateClassNames(selectors, className) {
  selectors.forEach(selector => {
    const icons = document.querySelectorAll(selector)
    icons.forEach((icon) => icon.classList.add(className))
  })
}

function fillFormForEdit(note) {
  modal.elements.name.value = note.name
  modal.elements.created.value = note.created
  modal.elements.category.value = note.category
  modal.elements.content.value = note.content
  modal.elements.dates.value = note.dates.join(', ');

   if (originalCreatedValue === undefined) {
     originalCreatedValue = note.created
     modal.elements.created.dataset.originalValue = originalCreatedValue
   }
  modal.elements.created.disabled = isEditMode
}

//listeners

export function addCreateNoteListener() {
  createNoteButton.addEventListener('click', openModal)
}

export function addAddNoteListener(initialNotes) {
  const addNoteButton = document.querySelector('.table_input_btn')
  addNoteButton.addEventListener('click', (event) =>
    handleFormSubmit(event, initialNotes)
  )
}

export function addCloseModalListener() {
  const closeModalButton = document.querySelector('.table_input_close')
  closeModalButton.addEventListener('click', closeModal)
}

export function addOpenArchivedBtnListener() {
  openArchiveBtn.addEventListener('click', handleOpenArchivedBtn)
}

export function addArchiveIconListeners() {
  const archiveIcons = document.querySelectorAll('.archive img')
  archiveIcons.forEach((archiveIcon) => {
    archiveIcon.addEventListener('click', handleArchiveNote)
  })
}

export function addUnarchiveIconListeners() {
  const unarchiveIcons = document.querySelectorAll('.unarchive img')
  unarchiveIcons.forEach((unarchiveIcon) => {
    unarchiveIcon.addEventListener('click', handleUnarchiveNote)
  })
}

export function addDeleteIconListeners() {
  const deleteIcons = document.querySelectorAll('.delete img')
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', handleDeleteNote)
  })
}

export function addEditIconListeners() {
  const editIcons = document.querySelectorAll('.table_edit_img')
  editIcons.forEach((editIcon) => {
    editIcon.addEventListener('click', handleEditNote)
  })
}