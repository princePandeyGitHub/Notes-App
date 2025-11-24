import './ViewNotePage.css';
import dayjs from 'dayjs';
import { useParams } from 'react-router';
export function EditNotePage({ notes, deleteNote }) {
    const {id} = useParams();

    const note = notes.find((n) => n.id === Number(id));
    return (
        <div className="note-container">
            <input type="text" className='note-title' value={note.title}
            style={{
                width: '80vw',
                height: '10vh',
                padding: '20px'
            }}/>

            <p className="note-date">{dayjs().format("DD MMM YYYY, hh:mm A")}</p>

            <textarea type="text" className='note-content' value={note.text} 
            style={{
                width: '80vw',
                height: '20vh'
            }}/>

            <div className="note-buttons">
                <button className="edit-btn">Save Note</button>
            </div>
        </div>
    )
}