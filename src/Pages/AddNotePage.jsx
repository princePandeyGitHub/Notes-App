import { useState } from 'react';
import { useNavigate } from 'react-router';
import './ViewNotePage.css';
import dayjs from 'dayjs';
export function AddNotePage({notes,setNotes}) {
    const navigate = useNavigate();
    const [noteTitle,setNoteTitle] = useState('')
    const [noteContent,setNoteContent] = useState('');

    const saveNote = () => {
        let id = 0;
        if(notes.length > 0){
            id = notes[(notes.length)-1].id + 1;
        }
        const newNote = {
            id: id,
            title: noteTitle,
            text: noteContent,
            createdAt: dayjs().toISOString()
        }
        setNotes([...notes, newNote])
        navigate(`/view-notes/${id}`)
    }
    return (
        <div className="note-container">
            <input type="text" className='note-title' placeholder='Title of your Note' required
            value={noteTitle}
            onChange={(event)=>{
                setNoteTitle(event.target.value)
            }}
            style={{
                width: '80vw',
                height: '10vh',
                padding: '20px'
            }}/>

            <p className="note-date">{dayjs().format("DD MMM YYYY, hh:mm A")}</p>

            <textarea type="text" className='note-content' placeholder='Content of your Note' required
            value={noteContent}
            onChange={(event)=>{
                setNoteContent(event.target.value)
            }}
            style={{
                width: '80vw',
                height: '20vh'
            }}/>

            <div className="note-buttons">
                <button className="edit-btn" onClick={saveNote}>Save Note</button>
            </div>
        </div>
    )
}