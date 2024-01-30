import { render,screen,cleanup,waitFor } from "@testing-library/react";

import * as deckUserService from '../../../../../services/entityService/deckService/deckUserService'
import LikedDecksCollection from "./LikedDeckCollection";
import { BrowserRouter } from "react-router-dom";

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const likedDecks =[
    {id:1,name:'First'},
    {id:2,name:'Second'},
    {id:3,name:'Third'}
]
afterEach(cleanup)

describe('Liked deck collection tests',()=>{
         
    it('Should display proper data and message when there are liked decks',async()=>{

        jest.spyOn(deckUserService,'getLikedDecks').mockImplementation(()=>Promise.resolve(likedDecks))

        render(
            <BrowserRouter>
                <LikedDecksCollection/>
            </BrowserRouter>
        )

        const deckCards = document.getElementsByClassName('deck-preview-wrapper')

        await waitFor(()=>{
            expect(deckCards).toHaveLength(3);
            expect(screen.getByText('First')).toBeInTheDocument
            expect(screen.getByText('Second')).toBeInTheDocument
            expect(screen.getByText('Third')).toBeInTheDocument
            expect(screen.getByText('Това са харесаните ви декове!')).toBeInTheDocument;
        })
    })

    it('Should display no elements message if there arent any elements',async()=>{

        jest.spyOn(deckUserService,'getLikedDecks').mockImplementation(()=>Promise.resolve())

        render(
            <BrowserRouter>
                <LikedDecksCollection/>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getByText('Няма резултати',{exact:false})).toBeInTheDocument
        })
    })
})
