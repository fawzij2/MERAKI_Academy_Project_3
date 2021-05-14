const express = require("express");

const app = express();
const PORT = 5000;

app.use(express.json());

const articles = [
    {
    id: 1,
    title: 'How I learn coding?',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    {
    id: 2,
    title: 'Coding Best Practices',
    description:
    'Lorem, ipsum dolor sit, Quam, mollitia.',
    author: 'Besslan',
    },
    {
    id: 3,
    title: 'Debugging',
    description:
    'Lorem, Quam, mollitia.',
    author: 'Jouza',
    },
    ];

// getAllArticles:
const getAllArticles = (req,res)=>{
    res.status = 200;
    res.json(articles);
}
app.get("/articles",getAllArticles)

// getAnArticleById:
const getAnArticleById = (req,res)=>{
    const articleId = JSON.parse(req.params.id);
    let found = false
    for (let i = 0 ;  i < articles.length ; i++){
        let idSearch = articles[i].id;
        if(articleId === idSearch){
            found = true
        }
    }
    if (found){
        res.status(200);
        res.json(articles[articleId-1]);
    } else {
    res.status(404);
    res.json(`article doesn't exist`);
    }
};
app.get(`/articles/:id`,getAnArticleById)

app.listen(PORT, ()=>{
    console.log(`the server is running on port: ${PORT}`);
})