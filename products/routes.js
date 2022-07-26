const express = require("express");
const {
        createPost,
        getPosts,
        getPost,
        updatePost,
        deletePost
    } = require("./controllers/posts.js");

const postRouter = express.Router();

postRouter.get("/", getPosts);
postRouter.post("/", createPost);
postRouter.get("/:postID", getPost);
postRouter.put("/:postID", updatePost);
postRouter.delete("/:postID", deletePost)

module.exports = postRouter;