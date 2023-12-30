import { Link } from 'react-router-dom'
import './PlaylistPreviewCard.css'

export default function PlaylistPreviewCard({playlist}){

    return(
        <article className="playlist-preview-card">
                <img src={playlist?.images[0].url} alt="Playlist Photo"/>
            <main className="playlist-preview-data">
                <h3>{playlist.name}</h3>
                <button className='playlist-details-btn'>
                   <Link to={`/playlist/${playlist.id}`}>Details</Link>
                </button>
            </main>
        </article>
    )

}