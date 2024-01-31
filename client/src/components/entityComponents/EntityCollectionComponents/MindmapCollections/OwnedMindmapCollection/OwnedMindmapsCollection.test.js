import { render,screen,cleanup,waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import * as mindmapService from '../../../../../services/entityService/mindmapService/mindmapUserService'
import OwnedMindmapCollection from './OwnedMindmapCollection'
import { BrowserRouter } from "react-router-dom";

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const ownedMindmaps =[
    {id:1,name:'Mindmap1'},
    {id:2,name:'Mindmap2'},
    {id:3,name:'Mindmap3'}
]
afterEach(cleanup)

describe('Owned mindmap collection test',()=>{
    it('Should render correct information when mindmaps are returnded',async()=>{
        jest.spyOn(mindmapService,'getOwnedMindmaps').mockImplementation(()=>Promise.resolve(ownedMindmaps))
         
        render(
            <BrowserRouter>
               <OwnedMindmapCollection/>
            </BrowserRouter>
           )
        const mindmapOwnedCards = document.getElementsByClassName('mindmap-preview-card')

        await waitFor(()=>{
            expect(mindmapOwnedCards).toHaveLength(3);
            expect(screen.getByText('Това са създадените от Вас мисловни карти!')).toBeInTheDocument;
            expect(screen.getByText('Mindmap1')).toBeInTheDocument
           expect(screen.getByText('Mindmap2')).toBeInTheDocument
           expect(screen.getByText('Mindmap3')).toBeInTheDocument
        })
    })

    it('Should display proper message when there are no mindmaps returnded',async()=>{
        jest.spyOn(mindmapService,'getOwnedMindmaps').mockImplementation(()=>Promise.resolve())

        render(
            <BrowserRouter>
                <OwnedMindmapCollection/>
            </BrowserRouter>
        )

        const mindmapCards  = document.getElementsByClassName('mindmap-preview-card')

        await waitFor(()=>{
            expect(mindmapCards).toHaveLength(0);
            expect(screen.getByText('Няма резултати')).toBeInTheDocument
        })
    })
})