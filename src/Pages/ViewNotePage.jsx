import './ViewNotePage.css';
import { useNavigate, useParams } from 'react-router';
import dayjs from 'dayjs';
export function ViewNotePage({ notes,deleteNote }) {
    const { id } = useParams()
    const navigate = useNavigate();

    // Find the note by id (MongoDB uses _id)
    const note = notes.find((n) => n._id === id);

    if (!note) {
        return <h2>Note not found</h2>;
    }

    return (
        <div className="note-container">
            <h1 className="note-title">{note.title}</h1>

            <p className="note-date">{dayjs(note.createdAt).format("DD MMM YYYY, hh:mm A")}</p>

            <div className="note-content">
                {note.content}
            </div>

            <div className="note-buttons">
                <button className="edit-btn"
                onClick={()=>{
                    navigate(`/edit-notes/${note._id}`)
                }}
                >Edit Note</button>
                <button className="delete-btn" onClick={() => 
                {
                    deleteNote(id) 
                    navigate(`/`)
                }}>Delete Note</button>
            </div>
        </div>
    )
}