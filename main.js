const express = require("express");
const {uuid} = require(`uuidv4`);

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
    res.status(200);
    res.json(articles);
}
app.get("/articles",getAllArticles);

// getAnArticleById:
const getAnArticleById = (req,res)=>{
    const articleId = JSON.parse(req.query.id);
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
app.get(`/articles/search_2`,getAnArticleById);

// getArticlesByAuthor;
const getArticlesByAuthor = (req,res)=>{
    const author = req.query.author;
    console.log(author);
    const foundArticles = articles.filter((elem,i)=>{
        return author === elem.author
    })
    if (foundArticles.length > 0){
        res.status(200);
        res.json(foundArticles)
    } else{
        res.status(404);
        res.json("articles not found");
    }
}

app.get(`/articles/search_1`, getArticlesByAuthor);


// createNewArticle
const createNewArticle = (req,res)=>{
    const addedArticle = {
        "title" : req.body.title,
        "description" : req.body.description,
        "author" : req.body.author,
        "id" : uuid()
    }
    articles.push(addedArticle);
    res.status(201);
    res.json(addedArticle);
}

app.post(`/articles`, createNewArticle)

app.listen(PORT, ()=>{
    console.log(`the server is running on port: ${PORT}`);
})