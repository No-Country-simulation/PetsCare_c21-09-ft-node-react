import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";

function App() {
  

  return (
    <>
       <>
      <BrowserRouter>
     
         {/* ElComponente Header */}
   
         
          
          <Routes>
            <Route path="/" element={<Home/>} />

        

          </Routes>
 

     

        {/* El componente Footer */}
          
       
  
      </BrowserRouter>
    </>
    </>
  )
}

export default App
