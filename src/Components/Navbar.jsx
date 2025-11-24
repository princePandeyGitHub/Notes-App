import './Navbar.css'
import { Link } from 'react-router'
export function Navbar() {
    return (
        <nav className="navbar">
            <Link to={'/'} style={{
                textDecoration: 'none'
            }}>
                <div className="brand">NOTES APP</div>
            </Link>

            <div className="search-container">
                <input type="text" placeholder="Search..." />
            </div>

            <Link to={'add-notes'}>
                <button className="nav-btn">Add Notes</button>
            </Link>
        </nav>
    )
}