import './HomePage.css'
import { useNavigate } from 'react-router'
export function HomePage({ notes, deleteNote }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="notes-container">
                {notes.map((note) => {
                    return (
                        <div key={note.id} className="note-card">
                            <div className="note-header">{note.title.slice(0, 20)}....</div>
                            <div className="note-text">{note.text.slice(0, 100)}......</div>
                            <div className="note-actions">
                                <button className="view-note" onClick={() => { navigate(`view-notes/${note.id}`) }}>View</button>
                                <button className="edit-note" onClick={() => { navigate(`edit-notes/${note.id}`) }}>Edit</button>
                                <button className="delete-note" onClick={() => { deleteNote(note.id) }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}