import './Dashboard.css'

import { Link } from 'react-router-dom'

import { useContext } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faNoteSticky,faChartArea,faRectangleList,faCalendar,faMusic, faSearch } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../contexts/AuthContext'

export default function Dashboard(){
    const {user} = useContext(AuthContext)

    return(
        <section className="dashboard-wrapper">
            <section className="dashboard-content">
                    <h1>Hello, {user?.username}!</h1>        
            </section>
            <aside className="dashboard-aside">
               <section className='owned-items'>
                  <h4>Owned by me:</h4>
                  <ul className="dashboard-owned-link-list">
                    <li>
                        <Link to={'/owned/notes'}>
                            <FontAwesomeIcon icon={faNoteSticky}/>Notes
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/decks'}>
                            <FontAwesomeIcon icon={faRectangleList}/>Decks
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/mindmaps'}>
                            <FontAwesomeIcon icon={faChartArea}/>Mindmaps
                        </Link>
                    </li>
                  </ul>
               </section>
               <section className='liked-items'>
                    <h4>Liked collections:</h4>
                    <ul className="dashboard-liked-link-list">
                       <li>
                           <Link to={'/liked/notes'}>
                                 <FontAwesomeIcon icon={faNoteSticky}/>Notes
                           </Link>
                       </li>
                       <li>
                           <Link to={'/liked/decks'}>
                           <FontAwesomeIcon icon={faRectangleList}/>Decks
                            </Link>
                       </li>
                       <li>
                           <Link to={'/liked/mindmaps'}>
                                <FontAwesomeIcon icon={faChartArea}/>Mindmaps
                           </Link>
                       </li>
                    </ul>
               </section>
               <section className='suggestion-collection'>
                            <h4>To help you with studying:</h4>
                            <ul className="suggestions-list">
                                <li>
                                    <Link to={'/search'}>
                                          <FontAwesomeIcon icon={faSearch}/>Search
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/agenda'}>
                                <FontAwesomeIcon icon={faCalendar} />Agenda
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/playlists'}>
                                          <FontAwesomeIcon icon={faMusic}/>Study Playlists
                                    </Link>
                                </li>
                            </ul>
               </section>
            </aside>
         </section>
                
    )
}