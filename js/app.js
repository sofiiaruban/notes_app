import {
  renderTable,
  addCreateNoteListener,
  addAddNoteListener,
  addCloseModalListener,
} from './utils.js'

import { initialNotes } from './data.js'

window.addEventListener('load', () => {
renderTable(initialNotes)
addCreateNoteListener()
addAddNoteListener()
addCloseModalListener()
})