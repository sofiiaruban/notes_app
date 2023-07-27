import {
  renderNotesOnLoad,
  addCreateNoteListener,
  addAddNoteListener,
  addCloseModalListener
} from './utils.js'

import { initialNotes } from './data.js'

window.addEventListener('load', () => {
renderNotesOnLoad(initialNotes)
console.log(initialNotes)
addCreateNoteListener()
addAddNoteListener()
addCloseModalListener()
})