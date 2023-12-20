import { Route,Routes } from "react-router-dom";
import { ReactFlowProvider } from "reactflow";

import { useState } from "react";

import { useInterval } from "usehooks-ts";

import useMusicAuth from "./hooks/useMusicAuth";

import Navigation from "./components/navigationComponents/Navigation";
import Login from "./components/authComponents/UserDeclarationComponents/LoginComponent/Login";
import Register from "./components/authComponents/UserDeclarationComponents/RegisterComponent/Register"
import Logout from "./components/authComponents/LogoutComponent/Logout";
import LandingPage from "./components/landingPageComponent/LandingPage";
import CreateMenu from "./components/entityComponents/creatorHubComponents/createMenu/CreateMenu";
import CreateDeck from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createDeckComponent/CreateDeck";
import DeckDetails from "./components/entityComponents/detailComponentPages/DeckDetailsComponent/DeckDetails";

import { AuthProvider } from "./contexts/AuthContext";
import { DeckProvider } from "./contexts/entityContexts/DeckContext";
import { NoteProvider } from "./contexts/entityContexts/NoteContext";
import { MindmapProvier } from "./contexts/entityContexts/MindmapContext";
import { DiagramProvider } from "./contexts/DiagramContext";

import CreateFlashcard from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createFlashcardComponent/createFlashcard";
import FlashcardDetails from "./components/entityComponents/detailComponentPages/DeckDetailsComponent/FlashcardComponents/FlashcardDetailsComponent/FlashcardDetails";
import EditDeck from "./components/entityComponents/EditFormComponents/EditDeckComponent/EditDeck";
import EditFlashcard from "./components/entityComponents/EditFormComponents/EditFlashcardComponent/EditFlashcard";
import AttachTagToDeck from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createTagComponent/attachTagToDeck/AttachTagToDeck";
import SearchFlashcard from "./components/entityComponents/detailComponentPages/DeckDetailsComponent/FlashcardComponents/SearchFlashcardComponent/SearchFlashcard";

import NotFound from "./components/404Component/NotFound";
import CreateNote from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createNoteComponent/CreateNote";
import NoteDetails from "./components/entityComponents/detailComponentPages/NoteDetailsComponent/NoteDetails";
import AttachTagToNote from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createTagComponent/attachTagToNote/AttachTagToNote";
import EditNote from "./components/entityComponents/EditFormComponents/EditNoteComponent/EditNote";
import CreateMindmap from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createMindmapComponent/CreateMindmap";
import MindmapDetails from "./components/entityComponents/detailComponentPages/MindmapDetailsComponent/MindmapDetails";
import AttachTagToMindmap from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createTagComponent/attachTagToMindmap/AttachTagToMindmap";
import EditMindmap from "./components/entityComponents/EditFormComponents/EditMindmapComponent/EditMindmap";
import Dashboard from './components/DashboardComponent/Dashboard'
import OwnedDeckCollection from "./components/entityComponents/EntityCollectionComponents/DeckCollections/OwnedDeckComponent/OwnedDeckCollection";
import LikedDecksCollection from "./components/entityComponents/EntityCollectionComponents/DeckCollections/LikedDeckComponent/LikedDeckCollection";
import OwnedNotesCollection from "./components/entityComponents/EntityCollectionComponents/NoteCollections/OwnedNoteComponent/OwnedNoteCollection";
import LikedNotesColection from "./components/entityComponents/EntityCollectionComponents/NoteCollections/LikedNoteComponent/LikedNotesCollection";
import OwnedMindmapCollection from "./components/entityComponents/EntityCollectionComponents/MindmapCollections/OwnedMindmapCollection/OwnedMindmapCollection";
import LikedMindmapsCollection from "./components/entityComponents/EntityCollectionComponents/MindmapCollections/LikedMindmapCollection/LikedMindmapCollection";
import Search from "./components/entityComponents/SearchComponent/Search";
import GuestGuard from "./components/guards/GuestGuard";
import AuthGuard from "./components/guards/AuthGuard";
import MusicDashboard from "./components/musicComponents/musicDashboarComponent/MusicDashboard";
function App() {

  const [musicToken,getToken] = useMusicAuth({});

  if(!musicToken.access_token){
      getToken();
  }
  
  useInterval(()=>{
    getToken();
   },3600000)

  return (
    <>
  <AuthProvider>
    <Navigation/>
    <DeckProvider>
      <NoteProvider>
        <MindmapProvier>
          <ReactFlowProvider>
            <DiagramProvider>
       <Routes>

         <Route element={<GuestGuard/>}>
               <Route path="/" element={<LandingPage/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/register" element={<Register/>}/>
         </Route>

         <Route element={<AuthGuard/>}>
                <Route path="/logout" element={<Logout/>}/>
             
                <Route path="/create" element={<CreateMenu/>}/>
                <Route path="/create/decks" element={<CreateDeck/>}/>
                <Route path="/create/flashcard" element={<CreateFlashcard/>}/>  
                <Route path="/deck/:deckId/add/tag" element={<AttachTagToDeck/>}/>
                <Route path="/deck/:deckId" element={<DeckDetails/>}/>
                <Route path="/update/deck/:deckId" element={<EditDeck/>}/>    
                <Route path='/deck/:deckId/search/flashcard'element={<SearchFlashcard/>}/>
             
                <Route path="/deck/:deckId/flashcard/:flashcardId" element={<FlashcardDetails/>}/>
                <Route path="/update/flashcard/:flashcardId" element={<EditFlashcard/>}/>
             
                <Route path="/create/notes" element={<CreateNote/>}/>
                <Route path="/note/:noteId" element={<NoteDetails/>}/>
                <Route path="/note/:noteId/add/tag" element={<AttachTagToNote/>}/>
                <Route path="/update/note/:noteId" element={<EditNote/>}/> 
             
                <Route path="/create/mindmaps"  element={<CreateMindmap/>}/>
                <Route path="/mindmap/:mindmapId" element={<MindmapDetails/>}/>
                <Route path="/mindmap/:mindmapId/add/tag" element={<AttachTagToMindmap/>}/>        
                <Route path="/update/mindmap/:mindmapId" element={<EditMindmap/>}/>
             
                <Route path="/owned/decks" element={<OwnedDeckCollection/>}/>
                <Route path="/liked/decks" element={<LikedDecksCollection/>}/>
             
                <Route path="/owned/notes" element={<OwnedNotesCollection/>}/>
                <Route path="/liked/notes" element={<LikedNotesColection/>}/>
             
                <Route path="/owned/mindmaps" element={<OwnedMindmapCollection/>}/>
                <Route path="/liked/mindmaps" element={<LikedMindmapsCollection/>}/>
             
                <Route path="/search" element={<Search/>}/>
                 
                <Route path="/welcome" element={<Dashboard/>}/>

                <Route path="/playlists" element={<MusicDashboard/>}/>
             
         </Route>

         <Route path="*" element={<NotFound/>}/>
       </Routes>
       </DiagramProvider>
        </ReactFlowProvider>
       </MindmapProvier>
       </NoteProvider>
    </DeckProvider>
    </AuthProvider>
    <Routes/>

    </>
  );
}

export default App;
