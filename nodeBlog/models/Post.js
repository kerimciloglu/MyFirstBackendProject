const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: { type: String, required:true },
    author: { type: mongoose.Types.ObjectId, ref:'users' },
    content: { type: String, required:true },
    post_image: { type: String, required:true },
    category: { type: mongoose.Types.ObjectId, ref:'categories' },
    date: { type:Date, default: Date.now }
})

module.exports = mongoose.model('Post', PostSchema)