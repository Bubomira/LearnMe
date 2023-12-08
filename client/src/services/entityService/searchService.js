import {post} from '../../utils/requester'

const endpointUrl = 'https://localhost:7065/api/search';

const mindmapUrl=`${endpointUrl}/mindmap/by`

const noteUrl=`${endpointUrl}/note/by`

const deckUrl=`${endpointUrl}/deck/by`

export const searchMindmapsByName = (searchString)=>post(`${mindmapUrl}/name`,searchString)

export const searchMindmapsByTag = (searchString)=>post(`${mindmapUrl}/tag`,searchString)

export const searchNotesByName = (searchString)=>post(`${noteUrl}/name`,searchString)

export const searchNotesByTag = (searchString)=>post(`${noteUrl}/tag`,searchString)

export const searchDecksByName = (searchString)=>post(`${deckUrl}/name`,searchString)

export const searchDecksByTag = (searchString)=>post(`${deckUrl}/tag`,searchString)