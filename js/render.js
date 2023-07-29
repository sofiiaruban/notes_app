import {
  addDeleteIconListeners,
  addArchiveIconListeners,
  addOpenArchivedBtnListener,
  addEditIconListeners
} from "./utils.js"

const notesTable = document.querySelector('.notes_table tbody')
const summaryTable = document.querySelector('.summary_table tbody')

export function renderTable(data) {
  notesTable.innerHTML = ''

  data.forEach((note, index) => {
    const newRow = notesTable.insertRow()
    newRow.innerHTML = `
      <td class="table_data">${note.name}</td>
      <td class="table_data">${note.created}</td>
      <td class="table_data">${note.category}</td>
      <td class="table_data">${note.content}</td>
      <td class="table_data edit_table_data">${note.dates.join(
        ', '
      )} <img class="table_edit_img" src="./assets/edit_icon.png" alt="edit" data-note-id="${index}"></td>
      <td class="table_data archive"><img src="./assets/archive_icon.png" alt="archive" data-note-id="${index}"></td>
      <td class="table_data unarchive hidden"><img src="./assets/unarchive_icon.png" alt="unarchive" data-note-id="${index}"></td>
      <td class="table_data delete"><img src="./assets/trash-icon.png" alt="trash can" data-note-id="${index}"></td>
    `
  })
  if (data.length === 0) {
    const messageRow = notesTable.insertRow()
    messageRow.innerHTML = `<td>You have no notes. Please create one or archived one</td>`
  }
  addDeleteIconListeners()
  addArchiveIconListeners()
  addOpenArchivedBtnListener()
  addEditIconListeners()
}

export function renderSummaryTable(notes, archiveNotes) {
  summaryTable.innerHTML = ''
  const allCategories = new Set([
    ...Object.keys(notes),
    ...Object.keys(archiveNotes)
  ])

  for (const category of allCategories) {
    const newRow = summaryTable.insertRow()
    const noteData = notes[category] || { active: 0, archived: 0 }
    const archiveData = archiveNotes[category] || { active: 0, archived: 0 }
    newRow.innerHTML = `
      <td class="table_data">${category}</td>
      <td class="table_data">${noteData.active}</td>
      <td class="table_data">${archiveData.archived}</td>
    `
  }
}
