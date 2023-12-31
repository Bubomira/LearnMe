import './Search.css'

import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import useChangeInput from '../../../hooks/useChangeInput'

import * as searchEngine from '../../../services/entityService/searchService'
import MindmapCollection from '../EntityCollectionComponents/MindmapCollections/MindmapCollection/MindmapCollection';
import NoteCollection from '../EntityCollectionComponents/NoteCollections/NoteCollection/NoteCollection';
import DeckCollection from '../EntityCollectionComponents/DeckCollections/DeckCollection/DeckCollection';
import useLoader from '../../../hooks/useLoader';

export default function Search(){

    const navigate = useNavigate();

    let [collection,setCollection] = useState([]);

    let [isSearched,setIsSearched] = useState(false);

    let [loader,setLoader] = useLoader();

    let [values,setValues] = useChangeInput({
        searchString:'',
        entityType:'mindmaps',
        searchType:'name'      
    });

    useEffect(()=>{
        setCollection([]);
        setIsSearched(false)
    },[values.entityType,values.searchType,isSearched])

    const onSearchHandler=(e)=>{
        e.preventDefault();
        setIsSearched(true)
        setCollection([]);
        if(loader){
          setLoader(false);
        }
        console.log('before search'+loader)
         try {
            switch (values.entityType) {
                case 'mindmaps':
                     values.searchType=='name'?
                     searchEngine.searchMindmapsByName(values.searchString).then(mindmaps=>{
                        setCollection(mindmaps)
                        setLoader(true);
                     }):
                     searchEngine.searchMindmapsByTag(values.searchString).then(mindmaps=>{
                        setCollection(mindmaps)
                        setLoader(true);
                    })      
                    break;
                case 'notes':
                    values.searchType=='name'?
                    searchEngine.searchNotesByName(values.searchString).then(notes=>{
                       setCollection(notes)
                       setLoader(true);
                    }) :
                    searchEngine.searchNotesByTag(values.searchString).then(notes=>{
                       setCollection(notes)
                       setLoader(true);
                   }) 
                break;
                   case 'decks':
                    values.searchType=='name'?
                    searchEngine.searchDecksByName(values.searchString).then(decks=>{
                       setCollection(decks)
                       setLoader(true);
                    }) :
                    searchEngine.searchDecksByTag(values.searchString).then(decks=>{
                       setCollection(decks)
                       setLoader(true);
                   })   
                   break;           
            }                 
         } catch (error) {
            navigate('/404')
         }
            
    }
    
    return(
        <section className="search-wrapper">
            <section className="search-form-wrapper">
                <form className="search-form" onSubmit={onSearchHandler}>
                    <section className="search-entity-section">
                       <select onChange={setValues} name='entityType' >
                           <option value={'mindmaps'}>Mindmaps</option>
                           <option value={'notes'}>Notes</option>
                           <option value={'decks'}>Decks</option>
                       </select>
                       <select onChange={setValues} name='searchType' >
                           <option value={'name'}>By name</option>
                           <option value={'tag'}>By tag</option>
                       </select>
                    </section>
                    <section className="search">
                        <input
                        type="text" 
                        name="searchString"
                        placeholder='Search...'
                        onChange={setValues}
                        />
                        <button className='search-button'>
                              <FontAwesomeIcon icon={faSearch}/>
                        </button>
                     </section>
                </form>
            </section>
            <section className='content-display'>
                {
                values.entityType=='mindmaps'?
                <MindmapCollection neededMessage={true} isSearched={isSearched} mindmaps={collection} loader={loader}/>
                :
                 values.entityType=='notes'?
                 <NoteCollection neededMessage={true} isSearched={isSearched}  notes={collection} loader={loader}/>:
                 <DeckCollection neededMessage={true} isSearched={isSearched}  decks={collection} loader={loader}/>     
                    
                }
            </section>
        </section>
    )
}