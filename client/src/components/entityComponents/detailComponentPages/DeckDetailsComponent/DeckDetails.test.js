import { render,cleanup,waitFor,screen } from "@testing-library/react";
import '@testing-library/jest-dom'

import * as deckService from '../../../../services/entityService/deckService/deckServices'

import { BrowserRouter } from "react-router-dom";

import {  DeckProvider } from "../../../../contexts/entityContexts/DeckContext";

import DeckDetails from "./DeckDetails";

jest.mock('../../../../hooks/useLoader',()=>{
    return{
        __esModule: true,
        default:()=>[true,jest.fn()]
    }
})

afterEach(cleanup)

describe('Deck details',()=>{
    it('Should render correct deck information',async()=>{

         jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            id:1,
            name:'My deck',
            flashcards:[
                {id:1, definition:'My flashcard 1'},
                {id:2, definition:'My flashcard 2'},
                {id:3, definition:'My flashcard 3'}
            ],
            tags:[
                {id:1,name:'My tag 1'}
            ]
         }))

         render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
         )

         const flashcards = document.getElementsByClassName('flashcard-content')
         const tags = document.getElementsByClassName('tag')

         await waitFor(()=>{
             expect(screen.getByText('My deck')).toBeInTheDocument;
             expect(flashcards).toHaveLength(3);
             expect(tags).toHaveLength(1)
         })
    })

    it('Should display owner buttons if deck is owned by user',async()=>{
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            id:1,
            isOwnedByUser:true,
            isLikedByUser:false
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getAllByRole('link')[0]).toHaveAttribute('href','/update/deck/1')
        })
    })

    it('Should display like buttons if user is not owner',async()=>{

        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            isOwnedByUser:false,
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
        )
        const element = document.querySelector('button svg')
        await waitFor(()=>{
            expect(element).toHaveClass('svg-inline--fa fa-thumbs-up')
        })
    })

    it('Should disable dislike button if deck is not liked by user',async()=>{

        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            isOwnedByUser:false,
            isLikedByUser:false
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        const element = document.querySelector('button')

        await waitFor(()=>{
            expect(element).toBeDisabled
        })
    })

    it('Should disable like button if user has already liked the button',async()=>{

        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            isOwnedByUser:false,
            isLikedByUser:true
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
        )

        const element = document.querySelectorAll('button')[1]

        await waitFor(()=>{
              expect(element).toBeDisabled
        })
    })

    it('Flashcard add section should be visible for owner of the deck',async()=>{
        jest.spyOn(deckService,'getDeck').mockImplementation(()=>Promise.resolve({
            isOwnedByUser:true,
            isLikedByUser:false
        }))

        render(
            <BrowserRouter>
               <DeckProvider>
                   <DeckDetails/>
               </DeckProvider>
            </BrowserRouter>
        )
        const element = document.querySelector('flashcards-button')

        await waitFor(()=>{
            expect(element).toBeInTheDocument
        })

    })
})

