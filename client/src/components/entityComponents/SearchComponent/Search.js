import './Search.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faSearch } from '@fortawesome/free-solid-svg-icons';

import useChangeInput from '../../../hooks/useChangeInput'

export default function Search(){

    let [values,setValues] = useChangeInput({
        searchString:'',
        entityType:'mindmaps',
        searchType:'name'      
    });

    const onSearchHandler=(e)=>{
         e.preventDefault();
         console.log(values)
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
                           <option value={'Name'}>By name</option>
                           <option value={'Tag'}>By tag</option>
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
        </section>
    )
}