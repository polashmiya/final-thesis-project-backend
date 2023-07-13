const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema(
    {
        title: { type: String },
        description: { type: String },
        Image: { type: String },
    },
    {
        collection: "Blogs",
    }
);

module.exports = mongoose.model("BlogsModel", BlogsSchema);
