// resources/js/app.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/NavBar';
import Example from './components/AddUsers';
import List from './components/Users/List';
import Search from './components/Users/Search';
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/add-users" element={<Example />} />
          <Route path="/list" element={<List />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('example')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);