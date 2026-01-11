import './HomePage.css'
import { useNavigate } from 'react-router'
export function HomePage({ notes, deleteNote }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="notes-container">
                {notes.map((note) => {
                    return (
                        <div key={note._id} className="note-card">
                            <div className="note-header">{note.title.length > 20 ? note.title.slice(0,20)+'...' : note.title}</div>
                            <div className="note-text">{note.content.length > 100 ? note.content.slice(0, 100)+'......' : note.content}</div>
                            <div className="note-actions">
                                <button className="view-note" onClick={() => { navigate(`view-notes/${note._id}`) }}>View</button>
                                <button className="edit-note" onClick={() => { navigate(`edit-notes/${note._id}`) }}>Edit</button>
                                <button className="delete-note" onClick={() => { deleteNote(note._id) }}>Delete</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}