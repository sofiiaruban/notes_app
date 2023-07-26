export function renderTable(data) {
  const notesTable = document.querySelector('.notes_table');
  data.forEach((note, index) => {
    const newRow = notesTable.insertRow(index+1)
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
export function openModal() {
  const modal = document.getElementById('noteModal')
  modal.style.display = 'block'
}