import { Route,Routes } from "react-router-dom";
import Navigation from "./components/navigationComponents/Navigation";
import Login from "./components/authComponents/LoginComponent/Login";
import Register from "./components/authComponents/RegisterComponent/Register"


function App() {
  return (
    <>
    <Navigation/>
       <Routes>
         <Route path="/login" element={<Login/>}/>
         <Route path="/register" element={<Register/>}/>
       </Routes>
    </>
  );
}

export default App;
