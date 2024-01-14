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
          <h3>Най-ефективния метод за учене!</h3>
          <button className='banner-button'>
            <Link 
            to={user?
            '/welcome' :'/register'}>Започнете сега
            </Link>
            </button>
        </section>
       </div>

       <div className='app-usage-container'>
        <h2>За какво можете да ползвате Learn me?</h2>
        <section className='app-usage-content'>
              <article className='app-usage-card'>
                <img src={notes} alt="notes" />
                 <main className='app-usage-card-main'>
                    <h5>Водене на бележки</h5> 
                    <p>Искате да имате копие на учебния материал?
                     Learn me предлага възможност за писане на бележки онлайн, както и сканиране на снимки, съдържащи полезна информация!
                    Можете да харесате и бележки, създадени от други потребители, ако ви се сторят полезни!</p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={flashcards} alt="flashcards" />
                 <main className='app-usage-card-main'>
                    <h5>Декове с флашкарти</h5> 
                    <p>Не сте сигурни как да се поготвите за изпит? 
                     Употребата на флашкарти е доказано средсто за преговор, а Learn me го прави по-лесно от всякога!
                     Организирай флашкарти във различни колекции, без значение дали са създадени от Вас или не!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={mindmaps} alt="mindmaps" />
                 <main className='app-usage-card-main'>
                    <h5>Мисловни карти</h5> 
                    <p>Искате да затвърдите знанията си?
                    Нашия вграден механизъм за създаване на мисловни карти ще ви помогне да отделите важните неща в уроците си!
                    Също така може да запазите мисловните карти, които ви харесат и направени от други потребители!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={agenda} alt="agenda" />
                 <main className='app-usage-card-main'>
                    <h5>Календар</h5> 
                    <p>Искате красив и лесен за използване планер?
                       Не се притеснявай, ние отново се притичаме на помощ! Learn me календарът 
                        ще ти помогне да запазиш важните за теб събития!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={playlists} alt="playlists" />
                 <main className='app-usage-card-main'>
                    <h5>Музика за концентрация</h5> 
                    <p>Не можете да се фокусираш докато учиш?
                        Няма нужда от притеснение! Открий най-добрата музика за учене и се потопи в процеса!
                    </p>
                 </main>
              </article>
              <article className='app-usage-card'>
                <img src={search} alt="mindmaps" />
                 <main className='app-usage-card-main'>
                    <h5>Търсачка</h5> 
                    <p>Не сте сигурни къде и как да намерите хубави материали за учене?
                        Learn me предлага търсене на мисловни карти, декове, флашкарти и бележки по име и таг, а ако нещо от резултатите
                        ви хареса ще може да го запазите за по-късно!
                    </p>
                 </main>
              </article>
        </section>
       </div>

       <div className='prices'>
            <h3>Най-добрата част? Напълно безплатно е!</h3>
       </div>
    </>)
}