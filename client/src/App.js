import { Route,Routes } from "react-router-dom";
import Navigation from "./components/navigationComponents/Navigation";
import Login from "./components/authComponents/UserDeclarationComponents/LoginComponent/Login";
import Register from "./components/authComponents/UserDeclarationComponents/RegisterComponent/Register"
import { AuthProvider } from "./contexts/AuthContext";
import Logout from "./components/authComponents/LogoutComponent/Logout";
import LandingPage from "./components/landingPageComponent/LandingPage";


function App() {
  return (
    <>
  <AuthProvider>
    <Navigation/>
       <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
         <Route path="/logout" element={<Logout/>}/>
       </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
