import { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate()

  const updateNote = (currNote) => {
    ref.current.click();
    setNote({
      id: currNote._id,
      etitle: currNote.title,
      edescription: currNote.description,
      etag: currNote.tag,
    });
  };

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "general",
  });

  const onChange = async (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
    // console.log(note)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  useEffect(() => {
    if (localStorage.getItem("token")){
    getNotes();
    }
    else{
      navigate("/login")
    }
  }, []);
  return (
    <>
      <AddNote />

      <button
        ref={ref}
        type="button"
        className="btn btn-primary invisible"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      
      
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="noteTitle" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    name="etitle"
                    className="form-control"
                    id="enoteTitle"
                    aria-describedby="enoteTitleHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                  <div id="enoteTitleHelp" className="form-text">
                    Please enter the note title [MIN: 3 Characters]
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="noteDescription" className="form-label">
                    Note Description
                  </label>
                  <input
                    type="text"
                    name="edescription"
                    className="form-control"
                    id="enoteDescription"
                    aria-describedby="noteDescriptionHelp"
                    onChange={onChange}
                    value={note.edescription}
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
                    name="etag"
                    type="text"
                    onChange={onChange}
                    className="form-control"
                    id="enoteTag"
                    aria-describedby="noteTagHelp"
                    value={note.etag}
                  />
                  <div id="noteTagHelp" className="form-text">
                    Enter note tag here. [Default: General]
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal">
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"
                disabled={note.etitle.length < 3 || note.edescription.length < 5}>
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="my-4 row">
        <h2>Your notes</h2>
        <div className="container mx-2 blockquote-footer">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes &&
          notes.map((note, index) => {
            return (
              <NoteItem
                key={note._id ? note._id : index}
                k={note._id ? note._id : index}
                note={note}
                updateNote={updateNote}
              />
            );
          })}
      </div>
    </>
  );
};

export default Notes;
