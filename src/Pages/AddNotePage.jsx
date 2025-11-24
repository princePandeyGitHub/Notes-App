import './ViewNotePage.css';
import dayjs from 'dayjs';
export function AddNotePage() {
    return (
        <div className="note-container">
            <input type="text" className='note-title' placeholder='Title of your Note'
            style={{
                width: '80vw',
                height: '10vh',
                padding: '20px'
            }}/>

            <p className="note-date">{dayjs().format("DD MMM YYYY, hh:mm A")}</p>

            <textarea type="text" className='note-content' placeholder='Content of your Note' 
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