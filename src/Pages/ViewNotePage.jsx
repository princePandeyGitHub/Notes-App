import './ViewNotePage.css';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
export function ViewNotePage({ notes,deleteNote }) {
    const { id } = useParams()
    const navigate = useNavigate();

    // Find the note by id
    const note = notes.find((n) => n.id === Number(id));

    if (!note) {
        return <h2>Note not found</h2>;
    }

    return (
        <div className="note-container">
            <h1 className="note-title">{note.title}</h1>

            <p className="note-date">{dayjs(note.createdAt).format("DD MMM YYYY, hh:mm A")}</p>

            <div className="note-content">
                {note.text}
            </div>

            <div className="note-buttons">
                <button className="edit-btn"
                onClick={()=>{
                    navigate(`/edit-notes/${note.id}`)
                }}
                >Edit Note</button>
                <button className="delete-btn" onClick={() => 
                {
                    deleteNote(note.id) 
                    navigate(`/`)
                }}>Delete Note</button>
            </div>
        </div>
    )
}