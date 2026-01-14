import './ViewNotePage.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';

export function EditNotePage({ notes, setNotes, setPopup, token }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const note = notes.find(n => n._id === id);  // Use _id for MongoDB

    const [noteTitle, setNoteTitle] = useState(note?.title || '');
    const [noteContent, setNoteContent] = useState(note?.content || '');

    const editNote = async () => {
        try {
            const editedNote = {
                title: noteTitle,
                content: noteContent,
            };

            await axios.put(`https://notes-app-backend-myak.onrender.com/notes/${id}`, editedNote, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            // Update local state
            const updatedNotes = notes.map(n =>
                n._id === id ? { ...n, ...editedNote } : n
            );

            setNotes(updatedNotes);
            navigate(`/view-notes/${id}`)

            setPopup({
                id: Date.now(),
                message: "Note Updated Successfully",
                status: "success"
            })
        } catch (error) {
            setPopup({
                id: Date.now(),
                message: "Note Updation Failed",
                status: "failure"
            })
        }
    };

    return (
        <div className="note-container">
            <input
                type="text"
                className="note-title"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                style={{ width: '80vw', height: '10vh', padding: '20px' }}
            />

            <p className="note-date">
                {dayjs().format("DD MMM YYYY, hh:mm A")}
            </p>

            <textarea
                className="note-content"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                style={{ width: '80vw', height: '20vh' }}
            />

            <div className="note-buttons">
                <button className="edit-btn" onClick={editNote}>Save Note</button>
            </div>
        </div>
    );
}
