import '../../EntityCollection.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faSadTear } from '@fortawesome/free-solid-svg-icons'

import MindmapPreviewCard from "../../../PreviewCardComponent/MindmapPreviewCard/MindmapPreviewCard"
import Loader from '../../../../loader/Loader'

export default function MindmapCollection({mindmaps,areOwned,neededMessage,isSearched,loader,firstTimeSearhed}){

    return(
        <div className="collection-wrapper">
            <header className="collection-header">
                  <h1 className='message'>
                  {neededMessage?
                    'Your search results:'
                    :areOwned?
                    'Here are your owned mindmaps!':
                    'These are the mindmaps you have liked!'
                    }
                  </h1>
            </header>
            {firstTimeSearhed?
            !loader?
            <Loader/>
            :
            <main className="collection">
                {mindmaps?.length>0?
                 mindmaps.map(mindmap=><MindmapPreviewCard mindmap={mindmap} key={mindmap.id}></MindmapPreviewCard>)
                 :
                 (isSearched && neededMessage)||(!isSearched && !neededMessage)? 
                 <p className="no-entities-message">
                    This collection is empty
                    <FontAwesomeIcon icon={faSadTear} />
                 </p>
                 :
                 <></>
                }
            </main>
            :
            <></>
            }
        </div>
    )

}