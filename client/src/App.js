import { Route,Routes } from "react-router-dom";
import Navigation from "./components/navigationComponents/Navigation";
import Login from "./components/authComponents/LoginComponent/Login";
import Register from "./components/authComponents/RegisterComponent/Register"
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <>
    <Navigation/>
    <AuthProvider>
       <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
       </Routes>
    </AuthProvider>
    </>
  );
}

export default App;
