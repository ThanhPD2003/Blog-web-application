import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import BlogList from './components/BlogList';

function App() {
  return (
    <div className='container-fulid'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/bloglist' element={<BlogList/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>    
  );
}

export default App;
