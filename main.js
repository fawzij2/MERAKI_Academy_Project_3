const express = require("express");
const {uuid} = require(`uuidv4`);
const db = require("./db");
const { User, Article, Comment, Role } = require("./schema");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const app = express();
const SECRET = process.env.SECRET
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
            res.json(`success delete article with Id:${articleId}`)
        }
    })
};

app.delete(`/articles/:id`, deleteArticleById);


// deleteArticlesByAuthor
const deleteArticlesByAuthor = (req,res)=>{
    const author = req.body.author;
    const opSuccess = {
        "success" : true,
        "message" : `Success Delete article with author => ${author}`
    };
    Article.deleteMany({author:author},(err)=>{
        if (err){
            res.json(err)
        }else{
            res.json(opSuccess)
        }
    })
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


//login
const login = (req,res)=>{
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;

    User.find({email:email})
    .populate("role","role permissions")
    .then(async (result)=>{
        console.log(result[0].password); 
        const passwordCompare = await bcrypt.compare(password,result[0].password,(err,result1)=>{
            if (result1){
                const payload = {
                        userId: result[0]._id,
                        country: result[0].country,
                        role: result[0].role
                    };
                    
                    const options = {
                        expiresIn: "1hr",
                    };
                    const token = jwt.sign(payload, SECRET, options);
                    console.log(token);
                    res.status(200);
                    res.json(token);
                } else {
                    res.status(403);
                    res.json(`The password you’ve entered is incorrect`);
                }
            })
        })
    .catch((err)=>{
        res.status(404)
        res.json(`the email doesn't exist`)
    })
};
app.post(`/login`,login);


//  createNewComment
const authentication = (req,res,next)=>{
    if (req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token,SECRET,(err,result)=>{
            if(err){
                res.status(403);
                const err_massege = {
                    message: "the token is invalid or has expired",
                    status: 403
                }
                return res.json(err_massege);
            }
            if(result){
                next()
            }
        })
    } else{
        res.json("please enter token")
    }
}
const createNewComment =(req,res)=>{
    const {comment,commenter} = req.body;
    const newComment = new Comment({
        comment,
        commenter,
        article: req.params.id
    });

    newComment.save()
    .then((result)=>{
        const resultJS = result.toObject();
        delete resultJS.article
        res.status(201);
        res.json(resultJS);
    })
    .catch((err)=>{
        res.json(err);
    })
}

app.post(`/articles/:id/comments`,authentication,createNewComment);

app.post(`/roles`,(req,res)=>{
    const {role,permissions} = req.body;
    const accountRole = new Role ({
        role,
        permissions
    })

    accountRole.save()
    .then((result)=>{
        res.json(result)
    })
    .catch((err)=>{
        res.json(err);
    })
})
app.listen(PORT, ()=>{
    console.log(`the server is running on port: ${PORT}`);
})