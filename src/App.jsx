import './index.css'
import { useEffect, useState } from 'react'
import { HomePage } from './Pages/HomePage'
import { Navbar } from './Components/Navbar.jsx'
import { ViewNotePage } from './Pages/ViewNotePage.jsx'
import { EditNotePage } from './Pages/EditNotePage.jsx'
import { AddNotePage } from './Pages/AddNotePage.jsx'
import { Route, Routes } from 'react-router'

export default function App() {
  let stored = localStorage.getItem('notes')
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState(stored ? JSON.parse(stored) : [])

  useEffect(() => {
  localStorage.setItem("notes", JSON.stringify(notes));
}, [notes]);

  const deleteNote = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={handleSearch}/>
      <Routes>
        <Route path='/' element={<HomePage notes={filteredNotes} deleteNote={deleteNote} />} />
        <Route path='view-notes/:id' element={<ViewNotePage notes={notes} deleteNote={deleteNote} />} />
        <Route path='edit-notes/:id' element={<EditNotePage notes={notes} setNotes={setNotes} deleteNote={deleteNote} />} />
        <Route path='add-notes' element={<AddNotePage notes={notes} setNotes={setNotes} />} />
      </Routes>

    </>
  )
}