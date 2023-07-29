import {
  addCreateNoteListener,
  addAddNoteListener,
  addCloseModalListener,
  getSummaryObj,
} from './utils.js'
import { initialNotes, archivedNotes } from './data.js'
import { renderTable, renderSummaryTable } from './render.js'

window.addEventListener('load', () => {
renderTable(initialNotes)
renderSummaryTable(getSummaryObj(initialNotes), getSummaryObj(archivedNotes))
addCreateNoteListener()
addAddNoteListener()
addCloseModalListener()

})