import Story from '../models/Story.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export const createStory = async (req, res) => {
    const { title, content, choices } = req.body;

    // Validate required fields
    if (!title || !content || !choices || !Array.isArray(choices)) {
        return res.status(400).json({ error: 'Title, content, and choices (array) are required' });
    }


    console.log('Received data:', { title, content, choices });

    try {
        
        const formattedChoices = choices.map(choice => {
            if (!choice.optionText || !choice.pathContent) {
                throw new Error('Each choice must have both "optionText" and "pathContent"');
            }
            return {
                optionText: choice.optionText,
                pathContent: choice.pathContent
            };
        });

        // Create the new story document
        const newStory = new Story({
            title,
            content,
            choices: formattedChoices,
            author: req.user.id
        });

        // Save the new story in the database
        await newStory.save();

        res.status(201).json(newStory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Delete Story
export const deleteStory = async (req, res) => {
    const { id } = req.params;
    try {
        await Story.findByIdAndDelete(id);
        res.json({ message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Get Stories
export const getStories = async (req, res) => {
    try {
        const stories = await Story.find().populate('author');
        res.json(stories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// new

export const likeStory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const story = await Story.findById(id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

        // Check if the user has already liked the story
        if (!story.lovedBy.includes(userId)) {
            story.likes += 1;
            story.lovedBy.push(userId);
            await story.save();
        }

        res.json({ likes: story.likes });
    } catch (error) {
        console.error('Error liking story:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const dislikeStory = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const story = await Story.findById(id);
        if (!story) return res.status(404).json({ message: 'Story not found' });

    
        if (!story.dislikes.includes(userId)) {
            story.dislikes.push(userId);
            await story.save();
        }

        res.json({ dislikes: story.dislikes.length });
        // res.json({ dislikes: story.dislikes});
    } catch (error) {
        console.error('Error disliking story:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
