import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const StoryList = () => {
    const [stories, setStories] = useState([]);
    const [error, setError] = useState(null);
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [optionCounts, setOptionCounts] = useState({});
    const [famousOption, setFamousOption] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const response = await axiosInstance.get('/api/stories');
                setStories(response.data);
                calculateOptionCounts(response.data);
            } catch (err) {
                setError('Error fetching stories');
            }
        };

        fetchStories();
    }, []);

    const calculateOptionCounts = (stories) => {
        const counts = {};

        stories.forEach(story => {
            story.choices.forEach(choice => {
                const option = choice.optionText;
                if (!counts[option]) {
                    counts[option] = 0;
                }
                counts[option]++;
            });
        });

        setOptionCounts(counts);
    };

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token is missing. Please log in.');
            return;
        }

        try {
            await axiosInstance.delete(`/api/stories/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const updatedStories = stories.filter(story => story._id !== id);
            setStories(updatedStories);
            calculateOptionCounts(updatedStories);
        } catch (err) {
            console.error('Error deleting story:', err);
            setError('Unable to delete the story. Please try again later.');
        }
    };

    const handleSelectStory = (id) => {
        setSelectedStoryId(id === selectedStoryId ? null : id);
    };

    const handleFamousOptionClick = (option) => {
        setFamousOption(option);
    };

    const filterStoriesByOption = (stories, option) => {
        return stories.filter(story =>
            story.choices.some(choice => choice.optionText === option)
        );
    };

   
    const handleLike = async (storyId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token is missing. Please log in.');
            return;
        }
    
        try {
            const response = await axiosInstance.post(`/api/stories/like/${storyId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStories(stories.map(story =>
                story._id === storyId ? { ...story, likes: response.data.likes } : story
            ));
        } catch (err) {
            console.error('Error liking story:', err.response ? err.response.data : err.message);
            setError('Unable to like the story. Please try again later.');
        }
    };
    
    

    const handleDislike = async (storyId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('Token is missing. Please log in.');
            return;
        }

        try {
            const response = await axiosInstance.post(`/api/stories/dislike/${storyId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setStories(stories.map(story =>
                story._id === storyId ? { ...story, dislikes: response.data.dislikes } : story
            ));
        } catch (err) {
            console.error('Error disliking story:', err.response ? err.response.data : err.message);
            setError('Unable to dislike the story. Please try again later.');
        }
    };

    
    

    return (
        <div className="story-container">
            {error && <p>{error}</p>}
            
            <div className="dropdown">
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                    {isDropdownOpen ? 'Hide Options' : ' Famous Options'}
                </button>

                {isDropdownOpen && (
                    <div className="dropdown-content">
                        <h3>Total Option Post Counts:</h3>
                        {Object.keys(optionCounts).length > 0 ? (
                            <ul>
                                {Object.entries(optionCounts).map(([option, count]) => (
                                    <li key={option}>
                                        <strong>Option {option}:</strong> {count}
                                        <button onClick={() => handleFamousOptionClick(option)}>
                                             Famous Option {option}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No options available</p>
                        )}
                    </div>
                )}
            </div>

            <div>
                <h2>{famousOption ? `Stories with Option ${famousOption}` : "Story List"}</h2>
                {error && <p>{error}</p>}
                <ul className="story-list">
                    {(famousOption ? filterStoriesByOption(stories, famousOption) : stories).map(story => (
                        <li key={story._id} className="story-item">
                            <div className="story-header">
                                <h3>{story.title}</h3>
                                <div className="story-actions">
                                    <button className="dot-menu">
                                        &#8226;&#8226;&#8226;
                                        <div className="dot-menu-content">
                                            <button onClick={() => handleSelectStory(story._id)}>
                                                {selectedStoryId === story._id ? 'Hide Choices' : 'Show Choices'}
                                            </button>
                                            <button onClick={() => handleDelete(story._id)}>
                                                Delete
                                            </button>
                                        </div>
                                    </button>
                                </div>
                            </div>
                            <p>{story.content}</p>
                            {selectedStoryId === story._id && (
                                <div className="choices-section">
                                    <h4>Choices:</h4>
                                    {Array.isArray(story.choices) && story.choices.length > 0 ? (
                                        <ul>
                                            {story.choices.map((choice, index) => (
                                                <li key={index} className="choice-item">
                                                    <p><strong>Option {index + 1}:</strong> {choice.optionText}</p>
                                                    <p><strong>Path Content:</strong> {choice.pathContent}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No choices available</p>
                                    )}
                                </div>
                            )}
                            <div className="user-interaction">
                                <button
                                    className={`like-button ${story.likedByUser ? 'active' : ''}`}
                                    onClick={() => handleLike(story._id)}
                                >
                                    Like {story.likes || 0}
                                </button>
                                <button
                                    className={`dislike-button ${story.dislikedByUser ? 'active' : ''}`}
                                    onClick={() => handleDislike(story._id)}
                                >
                                    Dislike {story.dislikes || 0}
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StoryList;




