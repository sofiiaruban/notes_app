import {
  renderTable,
  openModal,
  closeModal,
  handleFormSubmit
} from './utils.js'

let notes = [
  {
    name: 'Shopping List',
    created: '7/26/2023',
    category: 'Task',
    content: 'eggs, pasta, butter,salt',
    dates: ['7/26/2023']
  },
  {
    name: 'Thought',
    created: '7/26/2023',
    category: 'Random Thought',
    content: 'donec pretium vulputate',
    dates: ['7/26/2023']
  },
  {
    name: 'Bagfix',
    created: '7/26/2023',
    category: 'Idea',
    content: 'tincidunt ornare massa eget',
    dates: ['7/26/2023', '7/28/2023']
  },
  {
    name: 'Shopping List',
    created: '7/26/2023',
    category: 'Task',
    content: 'tincidunt ornare massa eget',
    dates: ['7/29/2023']
  },
  {
    name: 'Ornare Lectus',
    created: '7/26/2023',
    category: 'Random Thought',
    content: 'pellentesque massa placerat duis',
    dates: ['7/26/2023']
  },
  {
    name: 'Rhoncus Mattis',
    created: '7/26/2023',
    category: 'Idea',
    content: 'magna etiam tempor orci',
    dates: ['7/26/2023']
  }
]
const createNoteButton = document.getElementById('create_note_btn')
createNoteButton.addEventListener('click', openModal)

const addNoteButton = document.querySelector('.table_input_btn')
addNoteButton.addEventListener('click', handleFormSubmit)

const closeModalButton = document.querySelector('.table_input_close')
closeModalButton.addEventListener('click', closeModal)