import { Router } from 'express';
import { getStories, createStory, deleteStory, likeStory, dislikeStory } from '../controllers/storyController.js';
import authMiddleware from '../middleware/authMiddleware.js'; 


const router = Router();

router.post('/create', authMiddleware, createStory);
router.delete('/delete/:id', authMiddleware, deleteStory);
router.get('/', getStories);
router.post('/like/:id', authMiddleware, likeStory);
router.post('/dislike/:id', authMiddleware, dislikeStory);

export default router;

