import { render,screen,cleanup,waitFor } from "@testing-library/react";

import * as deckUserService from '../../../../../services/entityService/deckService/deckUserService'
import OwnedDeckCollection from "./OwnedDeckCollection";
import { BrowserRouter } from "react-router-dom";

jest.mock('../../../../../hooks/useLoader',()=>{
    return{
        __esModule:true,
        default:()=>[true,jest.fn()]
    }
})
const ownedDecks =[
    {id:1,name:'First'},
    {id:2,name:'Second'},
    {id:3,name:'Third'}
]
afterEach(cleanup)

describe('Owned deck collection tests',()=>{
         
    it('Should display proper data and message when there are owner decks',async()=>{

        jest.spyOn(deckUserService,'getOwnedDecks').mockImplementation(()=>Promise.resolve(ownedDecks))

        render(
            <BrowserRouter>
                <OwnedDeckCollection/>
            </BrowserRouter>
        )

        const deckCards = document.getElementsByClassName('deck-preview-wrapper')

        await waitFor(()=>{
            expect(deckCards).toHaveLength(3);
            expect(screen.getByText('First')).toBeInTheDocument
            expect(screen.getByText('Second')).toBeInTheDocument
            expect(screen.getByText('Third')).toBeInTheDocument
            expect(screen.getByText('Това са създадените от Вас декове!')).toBeInTheDocument;
        })
    })

    it('Should display no elements message if there arent any elements',async()=>{

        jest.spyOn(deckUserService,'getOwnedDecks').mockImplementation(()=>Promise.resolve())

        render(
            <BrowserRouter>
                <OwnedDeckCollection/>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getByText('Няма резултати',{exact:false})).toBeInTheDocument
        })
    })
})
