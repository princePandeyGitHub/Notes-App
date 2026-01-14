import { Link } from "react-router"
import './RegisterPage.css'
export function RegisterPage() {
    return (
        <div className="card">
            <h1>Register</h1>
            <form>
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Create Account</button>
            </form>
            <div className="link">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
    )
}