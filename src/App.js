import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import BlogList from './components/BlogList';
import Register from './components/Register';
import AddBlog from './components/AddBlog';
import Login from './components/Login';
import AdminBlogList from './components/AdminList';
import EditBlog from './components/EditBlog';
import UnapprovedBlogList from './components/Approve';
import BlogDetail from './components/BlogDetail';
import { UserProvider } from './components/UserContext'; // Import UserProvide
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UpdateProfile';

function App() {
  return (
    <div className='container-fulid'>
      <BrowserRouter>
        <UserProvider> {/* Wrap App with UserProvider */}
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/bloglist' element={<BlogList/>}/>
            <Route path="/addblog" element={<AddBlog />} />
            <Route path="/register" element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/adminBlogList' element={<AdminBlogList />} />
            <Route path='/edit/:bid' element={<EditBlog />} />
            <Route path='/detail/:bid' element={<BlogDetail/>} />
            <Route path='/userprofile/:uid' element={<UserProfile/>} />
            <Route path='/update/:uid' element={<UpdateProfile/>}/>
            <Route path='/approve' element={<UnapprovedBlogList/>} />
          </Routes>
          <Footer />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
