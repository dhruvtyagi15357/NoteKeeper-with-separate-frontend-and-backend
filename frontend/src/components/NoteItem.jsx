import React, { useContext } from 'react'
import "./NoteItem.css"
import noteContext from '../context/notes/noteContext'


const NoteItem = (props) => {
  const context = useContext(noteContext)
  const {deleteNote, editNote} = context

  const {note, updateNote} = props
  const handleDelete = (id) => {
    deleteNote(id)
    
  }

  const handleEdit = () => {
     updateNote(note)
  };
  return (
    <div className="card col-md-3 mx-2 my-2">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="card-title ">{note.title}</h5>
          <div className="d-flex">
            <i
              className="far fa-trash-alt mx-3"
              onClick={() => {
                handleDelete(note._id);
              }}></i>
            <i
              className="fa-regular fa-pen-to-square mx-1"
              onClick={() => {
                handleEdit(note._id);
              }}></i>
          </div>
        </div>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default NoteItem