import './Navigation.css'

import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { Link } from "react-router-dom"

export default function  Navigation(){

    const {user} = useContext(AuthContext)

    return(
        <header className='header-navigation' >
            <nav>
                <ul className="navigation-list">
                    {user.token?
                    <>
                       <li className="navigation-element"><Link to="/welcome">Welcome back!</Link></li>
                       <li className="navigation-element"><Link to="/agenda">Agenda</Link></li>

                       <li className="navigation-element"><Link to="/mindmaps">Mindmap Creator</Link></li>
                       <li className="navigation-element"><Link to="/decks">Memory cards</Link></li>
                       <li className="navigation-element"><Link to="/notes">Notes</Link></li>
                       <li className="navigation-element"><Link to="/logout">Logout</Link></li>
                    </>
                    :
                    <>
                      <li className="navigation-element"><Link to="/">Home</Link></li>
                      <li className="navigation-element"><Link to="/login">Login</Link></li>
                      <li className="navigation-element"><Link to="/register">Register</Link></li>
                    </>
                    }

                    {/* user links */}
                </ul>
            </nav>
        </header>
    )
}