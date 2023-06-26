import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <Header />
      <BrowserRouter>
        <Routes>

          <Route path="/register" element={<Register />}></Route>

        </Routes>
      </BrowserRouter>
      // <Footer />
  );
}

export default App;
