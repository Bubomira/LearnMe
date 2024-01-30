import { render,waitFor,cleanup} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import '@testing-library/jest-dom'

import * as router from 'react-router'
import * as mindmapService from '../../../../services/entityService/mindmapService/mindmapServices'

import { BrowserRouter } from "react-router-dom";
import { MindmapProvier } from "../../../../contexts/entityContexts/MindmapContext";

import EditMindmap from "./EditMindmap";

afterEach(cleanup)

const mockedUseNavigate = jest.fn()

beforeEach(()=>{
    jest.spyOn(router,'useNavigate').mockImplementation(()=>mockedUseNavigate)
    jest.spyOn(router,'useParams').mockImplementation(jest.fn().mockReturnValue({mindmapId:1}))
    jest.spyOn(global,'alert').mockImplementation(()=>jest.fn())
})

describe('Edit Mindmap Test',()=>{
    it('Should render correct mindmap name information',async()=>{
        jest.spyOn(mindmapService,'getMindmapDetails').mockImplementation(()=>Promise.resolve({
            id:1,
            name:'Old mindmap'
        }))

        render(
            <BrowserRouter>
                <MindmapProvier>
                     <EditMindmap/>
                </MindmapProvier>
            </BrowserRouter>
        )

        const input  = document.querySelector('input');
        await waitFor(()=>{
            expect(input).toHaveValue('Old mindmap')
        })
    })

    it('Should redirect to details page when everything is alright',async()=>{
        jest.spyOn(mindmapService,'getMindmapDetails').mockImplementation(()=>Promise.resolve({id:1,name:'Old mindmap'}))
        jest.spyOn(mindmapService,'updateMindmap').mockImplementation(()=>Promise.resolve())

         render(
            <BrowserRouter>
                <MindmapProvier>
                     <EditMindmap/>
                </MindmapProvier>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button');

        act(()=>{
            userEvent.click(editBtn);
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).toHaveBeenCalled;
        })
    })

    it('Should not redirect when there has been an error',async()=>{
        jest.spyOn(mindmapService,'getMindmapDetails').mockImplementation(()=>Promise.resolve({id:1,name:'Old mindmap'}))
        jest.spyOn(mindmapService,'updateMindmap').mockImplementation(()=>Promise.resolve(new Error()));

        render(
            <BrowserRouter>
                <MindmapProvier>
                     <EditMindmap/>
                </MindmapProvier>
            </BrowserRouter>
        )
    
            const editBtn = document.querySelector('.edit-button');
    
            act(()=>{
                userEvent.click(editBtn);
            })

            await waitFor(()=>{
                expect(mockedUseNavigate).not.toHaveBeenCalled;
            })
    })

    it('Form should not work with empty fields',async()=>{
        jest.spyOn(mindmapService,'getMindmapDetails').mockImplementation(()=>Promise.resolve({id:1,name:'Old mindmap'}))

        render(
            <BrowserRouter>
                <MindmapProvier>
                     <EditMindmap/>
                </MindmapProvier>
            </BrowserRouter>
        )

        const editBtn = document.querySelector('.edit-button')
        const input =document.querySelector('input')

        act(()=>{
              userEvent.click(editBtn);
              userEvent.clear(input)
        })

        await waitFor(()=>{
            expect(mockedUseNavigate).not.toHaveBeenCalled;
        })
    })
})
