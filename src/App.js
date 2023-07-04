import './App.css';

import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import Login from './components/Login';

function App() {
  return (
    <div className='container-fulid'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>    

  );
}

export default App;
