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
import CreateFlashcard from "./components/entityComponents/creatorHubComponents/createEntitiesComponents/createFlashcardComponent/createFlashcard";
import FlashcardDetails from "./components/entityComponents/detailComponentPages/DeckDetailsComponent/FlashcardComponents/FlashcardDetailsComponent/FlashcardDetails";

function App() {
  return (
    <>
  <AuthProvider>
    <Navigation/>
    <DeckProvider>
       <Routes>
         <Route path="/" element={<LandingPage/>}/>

         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/logout" element={<Logout/>}/>

         <Route path="/create" element={<CreateMenu/>}/>
         <Route path="/create/decks" element={<CreateDeck/>}/>
         <Route path="/create/flashcard" element={<CreateFlashcard/>}/>          
         <Route path="/deck/:deckId" element={<DeckDetails/>}/>
         <Route path="/deck/:deckId/flashcard/:flashcardId" element={<FlashcardDetails/>}/>
       </Routes>
    </DeckProvider>
    </AuthProvider>
    </>
  );
}

export default App;
