import './Navigation.css'

import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

import { Link } from "react-router-dom"

export default function  Navigation(){

    const {user} = useContext(AuthContext)

    return(
        <>
        <header className='header-navigation' >
            <nav>
                <ul className="navigation-list">
                    {user.token?
                    <>
                       <li className="navigation-element"><Link to="/welcome">Здравей отново</Link></li>
                       <li className="navigation-element"><Link to="/create">Създай</Link></li>
                       <li className="navigation-element"><Link to="/logout">Излез</Link></li>
                    </>
                    :
                    <>
                      <li className="navigation-element"><Link to="/">За нас</Link></li>
                      <li className="navigation-element"><Link to="/login">Вход</Link></li>
                      <li className="navigation-element"><Link to="/register">Регистрация</Link></li>
                    </>
                    }
                </ul>
            </nav>
        </header>
        </>
    )
}