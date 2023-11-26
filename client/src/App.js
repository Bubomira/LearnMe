import { Route,Routes } from "react-router-dom";
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
function App() {
  return (
    <>
  <AuthProvider>
    <Navigation/>
    <DeckProvider>
      <NoteProvider>
       <Routes>
         <Route path="/" element={<LandingPage/>}/>

         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
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

         <Route path="*" element={<NotFound/>}/>
       </Routes>
       </NoteProvider>
    </DeckProvider>
    </AuthProvider>
    </>
  );
}

export default App;
