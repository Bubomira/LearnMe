import { Link } from 'react-router-dom'
import './PlaylistPreviewCard.css'

export default function PlaylistPreviewCard({playlist}){

    return(
        <article className="playlist-preview-card">
            <header className='playlist-preview-header'>
                <img src={playlist?.images[0].url} alt="Playlist Photo"/>
            </header>
            <main className="playlist-preview-data">
                <h3>{playlist.name}</h3>
                <button className='playlist-details-btn'>
                   <Link to={`/playlist/${playlist.id}`}>Details</Link>
                </button>
            </main>
        </article>
    )

}