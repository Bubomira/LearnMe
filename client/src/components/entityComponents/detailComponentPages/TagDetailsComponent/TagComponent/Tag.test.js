import { render , screen,waitFor,cleanup} from "@testing-library/react";

import Tag from "./Tag";

afterEach(cleanup)

describe('Tag tests',()=>{
    it('Tag should render correct info',async()=>{
        
        render(<Tag  tag={{id:1,name:'My tag'}}/>)

        await waitFor(()=>{
            expect(screen.getByText('My tag')).toBeInTheDocument
        })
    })

    it('Remove tag should be available for owner',async()=>{
        
        render(<Tag isOwner={true} tag={{id:1,name:'My tag'}}/>)

        await waitFor(()=>{
            expect(document.querySelector('p remove-tag')).toBeInTheDocument
        })
    })

    it('Remove tag should not be available for user who is not the owner',async()=>{
        
        render(<Tag isOwner={true} tag={{id:1,name:'My tag'}}/>)

        await waitFor(()=>{
            expect(document.querySelector('p remove-tag')).not.toBeInTheDocument
        })
    })


})



