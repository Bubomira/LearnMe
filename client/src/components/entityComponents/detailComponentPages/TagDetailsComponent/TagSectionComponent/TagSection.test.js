import { screen,render,waitFor,cleanup } from "@testing-library/react";

import TagSection from "./TagSection";
import { BrowserRouter } from "react-router-dom";

describe('Tag section tests',()=>{
    it('Should render tags correctly',async()=>{

        render(<TagSection info={{tags:[{id:1,name:'My tag'},{id:2,name:'Other tag'}]}}/>)

        const tags = document.querySelectorAll('.tag')

        await waitFor(()=>{
            expect(screen.getByText('My tag')).toBeInTheDocument;
            expect(screen.getByText('Other tag')).toBeInTheDocument;
            expect(tags).toHaveLength(2);
        })
    })

    it('Button for adding tag should be visible for owner',async()=>{

        render(
            <BrowserRouter>
        <TagSection info={
            {tags:[{id:1,name:'My tag'},{id:2,name:'Other tag'}],
            isOwnedByUser:true
        } }/>
        </BrowserRouter>
        )

        const addTagBtn = document.querySelector('.add-tag');

        await waitFor(()=>{
            expect(addTagBtn).toBeInTheDocument;
        })
    })

    it('Button for adding tag should be hidden for user who is not the owner',async()=>{

        render(<TagSection  info={{tags:[{id:1,name:'My tag'},{id:2,name:'Other tag'}],isOwnedByUser:false}}/>)

        const addTagBtn = document.querySelector('.add-tag');

        await waitFor(()=>{
            expect(addTagBtn).not.toBeInTheDocument;
        })
    })
})