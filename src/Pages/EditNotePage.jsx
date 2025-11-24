import './ViewNotePage.css';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router';

export function EditNotePage({ notes, setNotes }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const note = notes.find(n => n.id === Number(id));

    const [noteTitle, setNoteTitle] = useState(note.title);
    const [noteContent, setNoteContent] = useState(note.text);

    const editNote = () => {
        const editedNote = {
            id: Number(id),
            title: noteTitle,
            text: noteContent,
            createdAt: dayjs().toISOString()
        };

        const updatedNotes = notes.map(n =>
            n.id === Number(id) ? editedNote : n
        );

        setNotes(updatedNotes);
        navigate(`/view-notes/${id}`)
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
