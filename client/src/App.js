import { Route,Routes } from "react-router-dom";
import Navigation from "./components/navigationComponents/Navigation";
import Login from "./components/authComponents/LoginComponent/Login";


function App() {
  return (
    <>
    <Navigation/>
       <Routes>
         <Route path="/login" element={<Login/>}/>
       </Routes>
    </>
  );
}

export default App;
