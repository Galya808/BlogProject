import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
let blogs = [];

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));
app.use(methodOverride('_method'));

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs: blogs});
});

app.get("/blogs", (req, res) => {
    res.render("post.ejs");
});

app.post('/blogs', (req, res) => {
    blogs.push({author: req.body["author"], text: req.body["text"]});
    res.redirect('/');
});

app.delete("/blogs/:id", (req, res) => {
    const { id } = req.params;
    delete blogs[id];
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});