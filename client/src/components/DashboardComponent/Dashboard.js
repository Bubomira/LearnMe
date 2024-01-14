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
                    <h1>Здравей, {user?.username}!</h1>        
            </section>
            <aside className="dashboard-aside">
               <section className='owned-items'>
                  <h4>Моите колекции:</h4>
                  <ul className="dashboard-owned-link-list">
                    <li>
                        <Link to={'/owned/notes'}>
                            <FontAwesomeIcon icon={faNoteSticky}/>Бележки
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/decks'}>
                            <FontAwesomeIcon icon={faRectangleList}/>Декове
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/mindmaps'}>
                            <FontAwesomeIcon icon={faChartArea}/>Мисловни карти
                        </Link>
                    </li>
                  </ul>
               </section>
               <section className='liked-items'>
                    <h4>Харесани колекции:</h4>
                    <ul className="dashboard-liked-link-list">
                       <li>
                           <Link to={'/liked/notes'}>
                                 <FontAwesomeIcon icon={faNoteSticky}/>Бележки
                           </Link>
                       </li>
                       <li>
                           <Link to={'/liked/decks'}>
                           <FontAwesomeIcon icon={faRectangleList}/>Декове
                            </Link>
                       </li>
                       <li>
                           <Link to={'/liked/mindmaps'}>
                                <FontAwesomeIcon icon={faChartArea}/>Мисловни карти
                           </Link>
                       </li>
                    </ul>
               </section>
               <section className='suggestion-collection'>
                            <h4>За още помощ с ученето:</h4>
                            <ul className="suggestions-list">
                                <li>
                                    <Link to={'/search'}>
                                          <FontAwesomeIcon icon={faSearch}/>Търсачка
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/agenda'}>
                                <FontAwesomeIcon icon={faCalendar} />Календар
                                    </Link>
                                </li>
                                <li>
                                    <Link to={'/playlists'}>
                                          <FontAwesomeIcon icon={faMusic}/>Учебна музика
                                    </Link>
                                </li>
                            </ul>
               </section>
            </aside>
         </section>
                
    )
}