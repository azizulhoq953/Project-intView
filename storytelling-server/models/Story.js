import { Schema, model } from 'mongoose';

const ChoiceSchema = new Schema({
    optionText: { type: String, required: true },
    pathContent: { type: String, required: true }
});

const StorySchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    choices: [ChoiceSchema],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expandTimes: { type: Map, of: Number, default: {} },
    lovedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array to track users who have "loved" the story
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likes: { type: Number, default: 0 } 
});

export default model('Story', StorySchema);
