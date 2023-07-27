import { initialNotes } from './data.js'

export function renderTable(data) {
  const notesTable = document.querySelector('.notes_table tbody')
  notesTable.innerHTML = ''
  data.forEach((note) => {
    const newRow = notesTable.insertRow()
    newRow.innerHTML = `
      <td class="table_data">${note.name}</td>
      <td class="table_data">${note.created}</td>
      <td class="table_data">${note.category}</td>
      <td class="table_data">${note.content}</td>
      <td class="table_data edit_table_data">${note.dates.join(
        ', '
      )} <img src="./assets/edit_icon.png" alt="edit"></td>
      <td class="table_data"><img src="./assets/archive_icon.png" alt="archive"></td>
      <td class="table_data"><img src="./assets/trash-icon.png" alt="trash can"></td>
    `
  })
}

export function renderNotesOnLoad(notes) {
  renderTable(notes)
  if (notes.length === 0) {
    const notesTable = document.querySelector('.notes_table')
    const messageRow = notesTable.insertRow(1)
    messageRow.innerHTML = `<td colspan="7">You have no notes. Please create one.</td>`
  }
}
export function openModal() {
  const modal = document.getElementById('note_modal')
  modal.style.display = 'flex'
}
export function closeModal() {
  const modal = document.getElementById('note_modal')
  modal.style.display = 'none'
}
export function handleFormSubmit(event) {
  event.preventDefault()

  const form = document.getElementById('note_modal')
  const formData = new FormData(form)
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
