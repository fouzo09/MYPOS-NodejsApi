const Post = require("../models/Post.js");


const getPosts = (req, res)=>{
    Post.find({})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(500).json(result));
}

const createPost = (req, res)=>{
    Post.create(req.body)
        .then((result)=> res.status(200).json(result))
        .catch((error)=>res.status(500).json(error));
}


const getPost = (req, res)=>{
    Post.find({_id: req.params.postID})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(500).json("Post non trouvé"));
}

const updatePost = (req, res)=>{
    Post.findOneAndUpdate({_id: req.params.postID}, req.body)
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(500).json("Post non trouvé"));
}

const deletePost = (req, res)=>{
    Post.findOneAndDelete({_id: req.params.postID})
        .then((result)=>res.status(200).json(result))
        .catch((error)=>res.status(500).json("Post non trouvé"));
}

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}