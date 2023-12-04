import './Dashboard.css'

import welcome from '../../../../static/img/welcome.jpg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faNoteSticky,faChartArea,faRectangleList } from '@fortawesome/free-solid-svg-icons'

import { Link } from 'react-router-dom'

export default function Dashboard(){
    return(
        <section className="dashboard-wrapper">
            <aside className="dashboard-aside">
               <h2>Your saved collections!</h2>
               <section className='owned-items'>
                  <h4>Owned by me:</h4>
                  <ul className="dashboard-owned-link-list">
                    <li>
                        <Link to={'/owned/notes'}>
                            <FontAwesomeIcon icon={faNoteSticky}/>Notes
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/mindmaps'}>
                            <FontAwesomeIcon icon={faChartArea}/>Mindmaps
                        </Link>
                    </li>
                    <li>
                        <Link to={'/owned/decks'}>
                            <FontAwesomeIcon icon={faRectangleList}/>Decks
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
                           <Link to={'/liked/notes'}>
                                <FontAwesomeIcon icon={faChartArea}/>Mindmaps
                           </Link>
                       </li>
                       <li>
                           <Link to={'/liked/notes'}>
                           <FontAwesomeIcon icon={faRectangleList}/>Decks
                            </Link>
                       </li>
                    </ul>
               </section>
            </aside>
            <section className="dashboard-content">
                <img src={welcome} alt="" />

            </section>
        </section>
    )
}