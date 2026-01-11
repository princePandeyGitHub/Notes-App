import './index.css'
import { useEffect, useState } from 'react'
import { HomePage } from './Pages/HomePage'
import { Navbar } from './Components/Navbar.jsx'
import { ViewNotePage } from './Pages/ViewNotePage.jsx'
import { EditNotePage } from './Pages/EditNotePage.jsx'
import { AddNotePage } from './Pages/AddNotePage.jsx'
import { Route, Routes } from 'react-router'
import axios from 'axios'
import StatusPopup from './Components/StatusPopup.jsx'

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([]);
  const [popup, setPopup] = useState({ id: 0, message: "", status: "" });

  // fetch the notes data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/notes');
        setNotes(res.data.notes)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`/notes/${id}`);

      // updating local state
      const updatedNotes = notes.filter(note => note._id !== id);
      setNotes(updatedNotes);

      setPopup({
      id: Date.now(),
      message: "Note Deleted Successfully",
      status: "success"
    });

    } catch (error) {
        setPopup({
        id: Date.now(),
        message: "Note Deletion Failed",
        status: "failure"
      });
    }
    
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  let filteredNotes = notes;
  if(notes) {
      filteredNotes = notes.filter(note =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }


  return (
    <>
      <Navbar onSearch={handleSearch} />
      <StatusPopup
      message={popup.message}
      status={popup.status}
      key={popup.id}
      />
      <Routes>
        <Route path='/' element={<HomePage notes={filteredNotes} deleteNote={deleteNote} />} />
        <Route path='view-notes/:id' element={<ViewNotePage notes={notes} deleteNote={deleteNote} />} />
        <Route path='edit-notes/:id' element={<EditNotePage notes={notes} setNotes={setNotes} setPopup={setPopup} />} />
        <Route path='add-notes' element={<AddNotePage notes={notes} setNotes={setNotes} setPopup={setPopup}/>} />
      </Routes>

    </>
  )
}