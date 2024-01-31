import { render,screen,cleanup,waitFor } from "@testing-library/react";

import * as mindmapService from '../../../../../services/entityService/mindmapService/mindmapUserService'
import LikedMindmapsCollection from "./LikedMindmapCollection";
import { BrowserRouter } from "react-router-dom";

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const likedMindmaps =[
    {id:1,name:'Mindmap1'},
    {id:2,name:'Mindmap2'},
    {id:3,name:'Mindmap3'}
]
afterEach(cleanup)

describe('Liked mindmaps collection tests',()=>{
    it('Should visualise correctly when there are returned mindmaps',async()=>{
       jest.spyOn(mindmapService,'getLikedMindmaps').mockImplementation(()=>Promise.resolve(likedMindmaps))

       render(
        <BrowserRouter>
           <LikedMindmapsCollection/>
        </BrowserRouter> 
       )
       
       const mindmapCards  = document.getElementsByClassName('mindmap-preview-card')

       await waitFor(()=>{
           expect(mindmapCards).toHaveLength(3);
           expect(screen.getByText('Mindmap1')).toBeInTheDocument
           expect(screen.getByText('Mindmap2')).toBeInTheDocument
           expect(screen.getByText('Mindmap3')).toBeInTheDocument
           expect(screen.getAllByText('Това са харесаните ви мисловни карти!')).toBeInTheDocument
       })
    })

    it('Should display proper message when there are not any liked mindmaps',async()=>{
        jest.spyOn(mindmapService,'getLikedMindmaps').mockImplementation(()=>Promise.resolve())

        render(
         <BrowserRouter>
            <LikedMindmapsCollection/>
         </BrowserRouter> 
        )

        const mindmapCards  = document.getElementsByClassName('mindmap-preview-card')

        await waitFor(()=>{
            expect(mindmapCards).toHaveLength(0);
            expect(screen.getByText('Няма резултати')).toBeInTheDocument
        })
        
    })
})