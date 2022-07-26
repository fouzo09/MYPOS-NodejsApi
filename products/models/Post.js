const mongoose = require("mongoose");


const PostSchema = mongoose.Schema({
    user_id: String,
    categorie_id: String,
    image: String,
    title: String,
    content: String,
    date: Date    
});


const Post = mongoose.model("Post", PostSchema);
module.exports = Post;