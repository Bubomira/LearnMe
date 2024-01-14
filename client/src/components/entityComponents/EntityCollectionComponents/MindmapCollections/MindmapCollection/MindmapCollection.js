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
                    'Резултати от търсенето:'
                    :areOwned?
                    'Това са създадените от Вас мисловни карти!':
                    'Това са харесаните ви мисловни карти!'
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
                    Няма резултати
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