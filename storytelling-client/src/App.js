import './index.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import CreateStory from './pages/CreateStory';
import LoginForm from './pages/LoginForm';

const App = () => {
    return (
        <Router>
            <div>
                <nav className='navigation'>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/create-story">Create Story</Link></li>
                        <li><Link to="/signup">Register</Link></li>
                        <li><Link to="/signin">Sign In</Link></li>
                       
                    </ul>
                </nav>
                <main>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/create-story" element={<CreateStory />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/signin" element={<LoginForm />} />                    
                    
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
