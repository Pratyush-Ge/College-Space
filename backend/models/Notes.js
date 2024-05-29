import mongoose from 'mongoose';

const materialSchema = new mongoose.Schema({
    title: String,
    url: String
});

const videoSchema = new mongoose.Schema({
    title: String
});

const subjectSchema = new mongoose.Schema({
    id: Number,
    name: String,
    videos: [videoSchema],
    materials: [materialSchema]
});

 const branchSchema = new mongoose.Schema({
    branch: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [subjectSchema]
});

const Notes = mongoose.model('notes', branchSchema);

export default Notes;
