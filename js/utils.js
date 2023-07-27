import { initialNotes, archivedNotes } from './data.js'

const notesTable = document.querySelector('.notes_table tbody')
const modal = document.getElementById('note_modal')
let isActive = false 


export function renderTable(data) {
  notesTable.innerHTML = ''
  data.forEach((note,index) => {
    const newRow = notesTable.insertRow()
    newRow.innerHTML = `
      <td class="table_data">${note.name}</td>
      <td class="table_data">${note.created}</td>
      <td class="table_data">${note.category}</td>
      <td class="table_data">${note.content}</td>
      <td class="table_data edit_table_data">${note.dates.join(
        ', '
      )} <img class="table_edit_img" src="./assets/edit_icon.png" alt="edit"></td>
      <td class="table_data archive"><img src="./assets/archive_icon.png" alt="archive" data-note-id="${index}"></td>
      <td class="table_data unarchive hidden"><img src="./assets/unarchive_icon.png" alt="unarchive" data-note-id="${index}"></td>
      <td class="table_data delete"><img src="./assets/trash-icon.png" alt="trash can" data-note-id="${index}"></td>
    `
  })
  if (data.length === 0) {
    const messageRow = notesTable.insertRow()
    messageRow.innerHTML = `<td>You have no notes. Please create one or archived one.</td>`
  }
  addDeleteIconListeners()
  addArchiveIconListeners()
  addOpenArchivedBtnListener()
}

export function openModal() {
  modal.style.display = 'flex'
}
export function closeModal() {
  modal.style.display = 'none'
}
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

  if (!name || !created || !category || !content || !dates) {
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

 initialNotes.push(newNote)
 form.reset()
 closeModal()
 renderTable(initialNotes)
}
export function addCreateNoteListener() {
  const createNoteButton = document.getElementById('create_note_btn')
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

function handleDeleteNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId
  if (noteIndex !== undefined) {
    initialNotes.splice(noteIndex, 1)
    renderTable(initialNotes)
  }
}
function addDeleteIconListeners() {
  const deleteIcons = document.querySelectorAll('.delete img')
  deleteIcons.forEach((deleteIcon) => {
    deleteIcon.addEventListener('click', handleDeleteNote)
  })
}

function handleArchiveNote(event) {
  const noteIndex = event.currentTarget.dataset.noteId
  if (noteIndex !== undefined) {
    const archivedNote = initialNotes.splice(noteIndex, 1)[0]
    archivedNotes.push(archivedNote)
    renderTable(initialNotes)
  }
}
function handleOpenArchivedBtn() {
  isActive = !isActive 
  isActive ? renderTable(archivedNotes) : renderTable(initialNotes)
  addClassesToIcons('.table_edit_img', 'hidden')
  addClassesToIcons('.table_edit_img', 'hidden')
  addClassesToIcons('.delete', 'hidden')
  addClassesToIcons('.archive', 'hidden')
  addClassesToIcons('.unarchive', 'active')
}
function addClassesToIcons(selector, className) {
  const icons = document.querySelectorAll(selector)
  icons.forEach((icon) => icon.classList.add(className))
}

export function addOpenArchivedBtnListener() {
  const openArchiveBtn = document.getElementById('open_archived_btn')
  openArchiveBtn.addEventListener('click', handleOpenArchivedBtn)
}
export function addArchiveIconListeners() {
  const archiveIcons = document.querySelectorAll('.archive img')
  archiveIcons.forEach((archiveIcon) => {
    archiveIcon.addEventListener('click', handleArchiveNote)
  })
}