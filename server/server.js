const express = require('express');

//Load env variable
require('dotenv').config();

//constants
const PORT = 8082;
const HOST = 'localhost'

//setup
const app = express();
app.use(express.json());

//database connection
const connectDb = require('./config/db');
connectDb();


//Global Variable
const USER_ROUTER = require('./routes/userRouter');
const MOVIE_ROUTER = require('./routes/movieRouter');
const THEATRE_ROUTER = require('./routes/theatreRouter');
const SHOW_ROUTER = require('./routes/showRouter');

//Routes
app.use('/api/users', USER_ROUTER);
app.use('/api/movies', MOVIE_ROUTER);
app.use('/api/theatres', THEATRE_ROUTER);
app.use('/api/shows', SHOW_ROUTER);

app.get('/',async (req,res)=>{
    return res.status(201).json({message: 'Welcome to the home page'});
});

app.use((req,res)=>{
    return res.status(404).json({message: 'Page not found'});
});

//start the server
app.listen(PORT, ()=>{
    console.log(`server is running on http://${HOST}:${PORT}`);
})