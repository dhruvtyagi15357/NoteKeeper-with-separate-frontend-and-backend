import React, { useContext, useState, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = () => {

    const context  = useContext(noteContext)
    const {addNote} = context;

    const [note, setNote] = useState(
        {
            title: "",
            description: "",
            tag: "general"
        }
    )
    
    const onChange = async (e) => {
        setNote({...note, [e.target.name]: e.target.value})

    }
    const handleSubmit = (e) =>{
        e.preventDefault()
        addNote(note.title, note.description, note.tag)
    }

  return (
    <div className="container my-3">
      <h2>Add a note</h2>

      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="noteTitle" className="form-label">
            Note Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="noteTitle"
            aria-describedby="noteTitleHelp"
            onChange={onChange}
          />
          <div id="noteTitleHelp" className="form-text">
            Please enter the note title [MIN: 3 Characters]
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="noteDescription" className="form-label">
            Note Description
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            id="noteDescription"
            aria-describedby="noteDescriptionHelp"
            onChange={onChange}
          />
          <div id="noteDescriptionHelp" className="form-text">
            Enter the note description here. [MIN: 5 Characters]
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="noteTag" className="form-label">
            Tag
          </label>
          <input
            name="tag"
            type="text"
            onChange={onChange}
            className="form-control"
            id="noteTag"
            aria-describedby="noteTagHelp"
          />
          <div id="noteTagHelp" className="form-text">
            Enter note tag here. [Default: General]
          </div>
        </div>

        {/* PASSWORD INPUT
          
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title.length<3 || note.description.length<5}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddNote