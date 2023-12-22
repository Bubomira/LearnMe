import './PlaylistTrack.css'

export default function PlaylistTrackComponent({track,onClickImg}){


    return( <article className='track-info' key={track?.id}>
            <section className="heading-track">
                <img onClick={(e)=>onClickImg(e,track?.preview_url,track?.name,track?.album?.images[0].url)} src={track?.album?.images[0].url} alt="" /> 
                <h4>{track?.name}</h4>
            </section>
        <p className='track-artist'>{track?.artists[0]?.name}</p>
    </article>)
}