import { useState } from 'react';
import { useNavigate } from 'react-router';
import './ViewNotePage.css';
import dayjs from 'dayjs';
import axios from 'axios';

export function AddNotePage({ notes, setNotes, setPopup }) {
    const navigate = useNavigate();
    const [noteTitle, setNoteTitle] = useState('')
    const [noteContent, setNoteContent] = useState('');

    const saveNote = async () => {
        try {
            const newNote = {
                title: noteTitle,
                content: noteContent,
            }

            const response = await axios.post('https://notes-app-backend-myak.onrender.com/notes', newNote);
            console.log('Note created:', response.data);
            setNotes([...notes, response.data.note])

            // Navigate to the newly created note
            navigate(`/view-notes/${response.data.note._id}`)
            setPopup({
                id: Date.now(),
                message: "Note Created Successfully",
                status: "success"
            })
        } catch (error) {
            setPopup({
                id: Date.now(),
                message: "Note Creation Failed",
                status: "failure"
            })
        }
    }
    return (
        <div className="note-container">
            <input type="text" className='note-title' placeholder='Title of your Note' required
                value={noteTitle}
                onChange={(event) => {
                    setNoteTitle(event.target.value)
                }}
                style={{
                    width: '80vw',
                    height: '10vh',
                    padding: '20px'
                }} />

            <p className="note-date">{dayjs().format("DD MMM YYYY, hh:mm A")}</p>

            <textarea type="text" className='note-content' placeholder='Content of your Note' required
                value={noteContent}
                onChange={(event) => {
                    setNoteContent(event.target.value)
                }}
                style={{
                    width: '80vw',
                    height: '20vh'
                }} />

            <div className="note-buttons">
                <button className="edit-btn" onClick={saveNote}>Save Note</button>
            </div>
        </div>
    )
}