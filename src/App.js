import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Jobs from './components/Jobs';
import Bookmarks from './components/Bookmarks';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>

        <div className="bottom-nav">
          <Link to="/jobs">Jobs</Link>
          <Link to="/bookmarks">Bookmarks</Link>
        </div>
      </div>
    </Router>
  );
};

export default App;
