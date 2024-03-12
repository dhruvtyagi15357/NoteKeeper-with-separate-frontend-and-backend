import { useState } from "react";
import noteContext from "./noteContext.jsx";

const NoteState = (props) => {
  // host
  const host = import.meta.env.VITE_MONGODB + ":" + import.meta.env.VITE_PORT;
  const [notes, setNotes] = useState([]);

  //Get all notes
  const getNotes = async () => {
    const url = `${host}/api/notes/fetchallnotes`;

    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const responseJson = await response.json()
    setNotes(responseJson)
  }

  // add a note
  // _note: has title, desc and tag only...
  const addNote = async (title, description, tag) => {
    // api call
    const url = `${host}/api/notes/addnote`;

    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const responseJson = await response.json()
    
    // client demo
    const _note = responseJson
    setNotes(notes.concat(_note));
  };

  //delete a note
  const deleteNote = async (id) => {
    // api call
    const url = `${host}/api/notes/deletenote/${id}`;

    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
      },
    });

    const responseJson = await response.json()

    //client
    setNotes(
      notes.filter((note) => {
        return note._id !== id;
      })
    );
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });

    const responseJson = response.json()

    //logic to edit in client
    const updatedNotes = notes.map((note) => {
      if (note._id === id) {
        return {
          ...note,
          title: title,
          description: description,
          tag: tag,
        };
      }
      return note;
    });

    setNotes(updatedNotes);
  };

  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
