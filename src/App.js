import './App.css';
import {
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/noteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';

function App(){

    const[alert,setAlert] = useState(null)

    const showAlert = (message,type)=>{
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(()=>{
        setAlert(null);
      },1000);
    }
    return(
    <>
    <NoteState>
        <BrowserRouter>
            <Navbar showAlert={showAlert}/>
            <Alert alert={alert}/>
            <div className='container'>
            <Routes>
                <Route path="/" element={<Home showAlert={showAlert}/>} />
                <Route path="/about" element={<About/>} />
                <Route path="/login" element={<Login showAlert={showAlert}/>} />
                <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
            </Routes>
            </div>
        </BrowserRouter>
    </NoteState>    
    </>
    );
}
export default App




