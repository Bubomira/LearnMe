import './Navigation.css'

import { Link } from "react-router-dom"

export default function  Navigation(){

    return(
        <header className='header-navigation' >
            <nav>
                <ul className="navigation-list">
                    <li className="navigation-element"><Link to="/">Home</Link></li>
                    {/* guest-links */}
                    <li className="navigation-element"><Link to="/login">Login</Link></li>
                    <li className="navigation-element"><Link to="/register">Register</Link></li>

                    {/* user links */}
                    <li className="navigation-element"><Link to="/welcome">Welcome back!</Link></li>
                    <li className="navigation-element"><Link to="/agenda">Agenda</Link></li>

                    <li className="navigation-element"><Link to="/mindmaps">Mindmap Creator</Link></li>
                    <li className="navigation-element"><Link to="/decks">Memory cards</Link></li>
                    <li className="navigation-element"><Link to="/notes">Notes</Link></li>
                </ul>
            </nav>
        </header>
    )
}