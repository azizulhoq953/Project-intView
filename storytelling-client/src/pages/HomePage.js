import React from 'react';
import StoryList from '../components/StoryList';
import '../index.css'
const HomePage = () => {
    return (
        <div className='HomePage'>
            <h1 >Welcome to the Story App</h1>
            <StoryList />
            <p>Here you can read and create stories.</p>
        </div>
    );
};

export default HomePage;
