import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/app.css';
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

function App() {
  

  return (
    <>
       <>
      <BrowserRouter>
     
        <div className="overflow-x-hidden">

          <NavBar />     

        </div>
   
         
          
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
