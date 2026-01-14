import { useState } from 'react';
import './Navbar.css'
import { Link } from 'react-router'
import { useNavigate } from 'react-router';
export function Navbar({ onSearch, setToken, setNotes }) {
    const navigate = useNavigate();
    const [query,setQuery] = useState('')
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        setToken(null);
        setNotes([]);
        localStorage.removeItem("token");
        navigate("/login");
    }; 

    return (
        <nav className="navbar">
            <Link to={'/'} style={{
                textDecoration: 'none'
            }} className='logo'>
                <div className="brand">NOTES APP</div>
                <img src="/icon.png" alt="image" width={'20px'} style={{marginLeft: '3px'}}/>
            </Link>

            <div className="search-container">
                <input type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        onSearch(e.target.value); // 🔥 live search everywhere
                    }}
                    onKeyDown={(e)=>{
                        if(e.key === 'Enter'){
                            navigate('/');
                        }
                    }} />
            </div>
            
            <div style={{display: 'flex', gap: '20px'}}>
            {isLoggedIn && <Link to={'add-notes'}>
                <button className="nav-btn">Add Notes</button>
            </Link>}

            {!isLoggedIn ? (<Link to={'login'}>
                <button className="nav-btn" style={{background: '#04AA6D', color: 'white'}}>Login</button>
            </Link>)
             : (
                <button className="nav-btn" onClick={handleLogout} style={{background: '#04AA6D', color: 'white'}}>Logout</button>
            )}
            </div>

        </nav>
    )
}