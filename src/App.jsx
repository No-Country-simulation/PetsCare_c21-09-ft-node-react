import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/app.css';
import Home from "./pages/Home";
import NavBar from "./components/navbar";
import Footer from "./components/Footer";

function App() {
  

  return (
    <>
       <>
      <BrowserRouter>
     
         <NavBar/>
   
         
          
          <Routes>
            <Route path="/" element={<Home/>} />

        

          </Routes>
 

     

       <Footer/>
          
       
  
      </BrowserRouter>
    </>
    </>
  )
}

export default App
