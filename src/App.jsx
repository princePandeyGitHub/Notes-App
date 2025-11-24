import './index.css'
import { useState } from 'react'
import { HomePage } from './Pages/HomePage'
import { Navbar } from './Components/Navbar.jsx'
import { ViewNotePage } from './Pages/ViewNotePage.jsx'
import { EditNotePage } from './Pages/EditNotePage.jsx'
import { AddNotePage } from './Pages/AddNotePage.jsx'
import { Route, Routes } from 'react-router'

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState([
    {
      "id": 1,
      "title": "Refactoring Plan for Notes App",
      "text": "The app needs a cleaner component structure. Break large components into smaller reusable ones. Introduce a NotesContext to manage global state. Add debounced search to reduce unnecessary renders. Consider using localStorage sync with an interval backup.",
      "createdAt": "2025-01-12T09:18:42Z"
    },
    {
      "id": 2,
      "title": "Study Notes: Machine Learning",
      "text": "Supervised learning involves labeled data while unsupervised deals with unlabeled patterns. Key algorithms: Linear Regression, SVM, k-Means, DBSCAN. Remember to revise bias-variance tradeoff and the curse of dimensionality before the exam.",
      "createdAt": "2025-01-15T14:52:10Z"
    },
    {
      "id": 3,
      "title": "Travel Prep Checklist",
      "text": "Pack sweaters, powerbank, chargers, extra socks, and toiletries. Confirm hotel check-in time. Download offline maps for the city. Also prepare a list of local restaurants to try and places to visit.",
      "createdAt": "2025-02-03T07:05:33Z"
    },
    {
      "id": 4,
      "title": "Health Tracking Log",
      "text": "Felt more energetic this week. Averaged 7 hours of sleep daily. Reduced sugar intake. Need to increase water consumption and go for a 30-min morning walk consistently.",
      "createdAt": "2025-02-10T19:40:11Z"
    },
    {
      "id": 5,
      "title": "React Concepts Revision",
      "text": "Revisit useEffect cleanup behavior, dependency array rules, memoization techniques using useMemo and React.memo. Also practice forms using controlled components and validation patterns.",
      "createdAt": "2025-03-01T11:26:55Z"
    },
    {
      "id": 6,
      "title": "Budget Planning for This Month",
      "text": "Track expenses daily. Allocate fixed budget categories: food, commute, emergencies, learning resources, and savings. Cross-check bank statements every Sunday evening.",
      "createdAt": "2025-03-03T16:13:21Z"
    },
    {
      "id": 7,
      "title": "Reading Summary: Deep Work",
      "text": "Deep work is focused, distraction-free productivity that pushes cognitive limits. Key ideas: embrace boredom, schedule social media, and create rituals for focus. Apply 2-hour focus blocks twice a day.",
      "createdAt": "2025-03-15T08:48:59Z"
    },
    {
      "id": 8,
      "title": "Feature Ideas for Version 2 of Notes App",
      "text": "Add color tags for notes, pin important notes, integrate simple password lock, add markdown support, and enable light/dark theme toggle. Also consider exporting notes as PDF.",
      "createdAt": "2025-03-20T10:22:44Z"
    },
    {
      "id": 9,
      "title": "Internship Preparation Plan",
      "text": "Revise DSA topics: arrays, strings, hashing, DP basics. Practice system design for beginners. Update resume with recent projects. Prepare short answers for 'Tell me about yourself.'",
      "createdAt": "2025-04-01T12:05:38Z"
    },
    {
      "id": 10,
      "title": "Daily Reflection",
      "text": "Today was productive. Completed pending tasks and finally cleaned the workspace. Need to keep a habit of ending the day by planning the next one. Avoid checking phone immediately after waking up.",
      "createdAt": "2025-04-03T21:14:02Z"
    }])

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