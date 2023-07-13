const express = require("express");
const router = express.Router();
const Blogs = require("../model/blogs.model");

router.get("/", async (req, res) => {
    try {
        const blogs = await Blogs.find();
        res.json(blogs);
    } catch (err) {
        res.send("Error " + err);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const blog = await Blogs.findById(req.params.id);
        res.send(blog);
    } catch (err) {
        res.send("Error " + err);
    }
});


module.exports = router;
