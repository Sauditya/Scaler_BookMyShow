const movieRouter = require('express').Router();
const {addMovie, getAllMovies, getMovieById, deleteMovie, updateMovie} = require('../controllers/movieController');


//GET
movieRouter.get('/get-all-movies', getAllMovies);
movieRouter.get('/get-movie/:id', getMovieById);

//POSt
movieRouter.post('/add-movie', addMovie);
movieRouter.post('/delete-movie', deleteMovie);

//PUT
movieRouter.put('/update-movie', updateMovie);


module.exports = movieRouter;