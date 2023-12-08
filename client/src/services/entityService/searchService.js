import {post} from '../../utils/requester'

const endpointUrl = 'https://localhost:7065/api/search';

const mindmapUrl=`${endpointUrl}/mindmap/by`

const noteUrl=`${endpointUrl}/note/by`

const deckUrl=`${endpointUrl}/deck/by`

export const searchMindmapByName = (searchString)=>post(`${mindmapUrl}/name`,searchString)

export const searchMindmapByTag = (searchString)=>post(`${mindmapUrl}/tag`,searchString)

export const searchNoteByName = (searchString)=>post(`${noteUrl}/name`,searchString)

export const searchNoteByTag = (searchString)=>post(`${noteUrl}/tag`,searchString)

export const searchDeckByName = (searchString)=>post(`${deckUrl}/name`,searchString)

export const searchDeckBytAG = (searchString)=>post(`${deckUrl}/tag`,searchString)