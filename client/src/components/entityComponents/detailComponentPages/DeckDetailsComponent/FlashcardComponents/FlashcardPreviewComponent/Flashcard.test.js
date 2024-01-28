import { cleanup,screen,waitFor,render } from "@testing-library/react";

import '@testing-library/jest-dom'

import { BrowserRouter } from "react-router-dom";
import { DeckContext, DeckProvider } from "../../../../../../contexts/entityContexts/DeckContext";

import Flashcard from "./Flashcard";


afterEach(cleanup)

describe('Flashcard preview tests',()=>{
    it('Should render correct flashcard information',async()=>{

        render(
            <BrowserRouter>
               <DeckProvider>
                   <Flashcard flashcard={{id:1,definition:'My new flashcard',explanation:'this'}}/>
               </DeckProvider>
            </BrowserRouter>
        )

        await waitFor(()=>{
            expect(screen.getByText('My new flashcard',{exact:false})).toBeInTheDocument
            expect(screen.getByText('this',{exact:false})).toBeInTheDocument
        })
    })

    it('Should display remove flashcard button if the user is owner of the deck',async()=>{
       
        render(
            <BrowserRouter>
               <DeckContext.Provider value={{deck:{isOwnedByUser:true}}}>
                   <Flashcard flashcard={{id:1,definition:'My new flashcard',explanation:'this'}}/>
               </DeckContext.Provider>
            </BrowserRouter>
        )
             const element = document.querySelector('p')
            await waitFor(()=>{
              expect(element).toHaveClass('remove-flashcard')
            })
    })
})