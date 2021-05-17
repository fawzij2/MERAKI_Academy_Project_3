const express = require("express");
const {uuid} = require(`uuidv4`);
const db = require("./db");
const { User, Article } = require("./schema");

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
    Article.find({})
    .then((result)=>{
        res.status(200);
        res.json(result);
    })
    .catch((err)=>{
        res.json(err)
    })
}
app.get("/articles",getAllArticles);

// getAnArticleById:
const getAnArticleById = (req,res)=>{
    const articleId = req.query.id;
    Article.find({_id:articleId})
    .populate("author","firstName")
    // .exec()
    .then((result)=>{
        res.status(200);
        res.json(result);
    })
    .catch((err)=>{
        res.json(err)
    })
}
app.get(`/articles/search_2`,getAnArticleById);

// getArticlesByAuthor;
const getArticlesByAuthor = (req,res)=>{
    const author = req.query.author;
    // console.log(author);
    Article.find({author:author})
    .then((result)=>{
        res.status(200)
        res.json(result);
    })
    .catch((err)=>{
        res.status(404);
        res.json(err);
    })
}

app.get(`/articles/search_1`, getArticlesByAuthor);


// createNewArticle
const createNewArticle = (req,res)=>{
    const {title, description, author} = req.body
    const addedArticle = new Article({
        title,
        description,
        author
    })
    
    addedArticle.save()
    .then((result)=>{
        res.status(201);
        res.json(result);
    })
    .catch((err)=>{
        res.json(err)
    })
};

app.post(`/articles`, createNewArticle)

// updateAnArticleById
const updateAnArticleById = async (req,res)=>{
    const articleId = req.params.id;
        if (req.body.title){
            await Article.updateOne({_id:articleId},{title:req.body.title},(err,result)=>{
                if (err){
                    res.json(err)
                }
            });
        };
        if (req.body.description){
            await Article.updateOne({_id:articleId},{description:req.body.description},(err,result)=>{
                if (err){
                    res.json(err)
                }
            });
        };
        if (req.body.author){
            await Article.updateOne({_id:articleId},{author:req.body.author},(err,result)=>{
                if (err){
                    res.json(err)
                }
            });
        };
        Article.find({_id:articleId})
        .then((result)=>{
            res.json(result)
        }).catch((err)=>{
            res.json(err)
        })
} 


app.put(`/articles/:id`,updateAnArticleById);

// deleteArticleById
const deleteArticleById = (req,res)=>{
    const articleId = req.params.id;
    Article.deleteOne({_id:articleId},(err)=>{
        if(err){
            res.json(err)
        } else{
            res.json("delete successful")
        }
    })
};

app.delete(`/articles/:id`, deleteArticleById);

// deleteArticlesByAuthor
const deleteArticlesByAuthor = (req,res)=>{
    const author = req.body.author;
    for (let i =0; i<articles.length ; i++){
        if (author.toLowerCase() === (articles[i].author).toLowerCase()){
            articles.splice(i,1);
            i--
        }
    }
    const opSuccess = {
        "success" : true,
        "message" : `Success Delete article with author => ${author}`
    };
    res.json(opSuccess);
}

app.delete(`/articles`, deleteArticlesByAuthor);

//createNewAuthor
const createNewAuthor = (req,res)=>{
    const {firstName,lastName,age,country,email,password} = req.body
    const newAuthor = new User ({
        firstName,
        lastName,
        age,
        country,
        email,
        password,
    });

    newAuthor.save()
    .then((result)=>{
        res.status(201)
        res.json(result);
    })
    .catch((err)=>{
        res.json(err)
    })
};

app.post("/users",createNewAuthor);

app.listen(PORT, ()=>{
    console.log(`the server is running on port: ${PORT}`);
})