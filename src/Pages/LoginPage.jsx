import { Link } from 'react-router'
import './LoginPage.css'
export function LoginPage() {
    return (
        <div className="card">
            <h1>Login</h1>
            <form>
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <div className="link">
                Don't have an account? <Link to="/register">Register</Link>
            </div>
        </div>
    )
}