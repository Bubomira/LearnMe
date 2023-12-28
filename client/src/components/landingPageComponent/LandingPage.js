import flashcards from '../../static/img/flashcards.jpg'
import mindmaps from '../../static/img/mindmaps.jpg'
import agenda from '../../static/img/agenda.jpg'
import playlists from '../../static/img/playlists.jpg'
import notes from '../../static/img/notes.jpg'
import search from '../../static/img/search.jpg'

import girl from '../../static/img/bannerGirl.jpg'

import { Link } from 'react-router-dom'
import './LandingPage.css'

import { useContext } from 'react'

import { AuthContext } from '../../contexts/AuthContext'

export default function LandingPage(){

   const {user} = useContext(AuthContext)
    return(<>
       <div className="banner">
        <img src={girl} ></img>
        <section className='content'>
          <h1>LEARN ME</h1>
          <h3>The best way to learn effectively!</h3>
          <button className='banner-button'>
            <Link 
            to={user?
            '/welcome' :'/register'}>Explore
            </Link>
            </button>
        </section>
       </div>

       <div className='app-usage-container'>
        <h2>What can you use the Learn me app for?</h2>
        <section className='app-usage-content'>
              <article className='app-usage-card'>
                <img src={notes} alt="notes" />
                 <main className='app-usage-card-main'>
                    <h5>Note taking</h5> 
                    <p>Have problems with note taking and storage? 
                     Learn me offers you the possibility to take notes online or scan the image of your already existing ones!
                     You can even like other users notes, if you find them helpful!</p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={flashcards} alt="flashcards" />
                 <main className='app-usage-card-main'>
                    <h5>Flashcards and decks revision</h5> 
                    <p>Not sure how to prepare for an exam? The usage of flashcards
                        is proven to be the best way one can remember facts and Learn me makes this task easier than ever!
                        Organise flashcards, which can contain images and text in different decks,
                        no matter if they are yours or not!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={mindmaps} alt="mindmaps" />
                 <main className='app-usage-card-main'>
                    <h5>Mindmaps</h5> 
                    <p>Want to make your knowledge permanent?
                   Our built in tool for creating mindmaps can help you easily sort and single out facts from your lesson!
                   You can also save every mindmap you find on the Learn me app, even if another user created it!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={agenda} alt="agenda" />
                 <main className='app-usage-card-main'>
                    <h5>Agenda</h5> 
                    <p>Want a pretty and easy to use planner?
                        Dont worry, we got you! With the Learn me agenda 
                        you can write down events which you dont want to miss!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={playlists} alt="playlists" />
                 <main className='app-usage-card-main'>
                    <h5>Playlists for concentration</h5> 
                    <p>Cannot focus during a study session!
                        We have your back again! Discover the best playlists for learning,
                         which will make your study experience better!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={search} alt="mindmaps" />
                 <main className='app-usage-card-main'>
                    <h5>Search engine</h5> 
                    <p>Not sute where to find the right study materials?
                        Learn me comes to the rescue again,
                         because it allows you to search notes, decks, flashcards and mindmaps by their name or tag! This will 
                         give you the possibility to stumble across great study materials, which you will be able to save for later!
                    </p>
                 </main>
              </article>
        </section>
       </div>

       <div className='prices'>
            <h3>The best part? It is completely free!</h3>
       </div>
    </>)
}