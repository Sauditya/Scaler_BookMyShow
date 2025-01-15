const MovieModel = require("../models/movieModel");

//GET
const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MovieModel.find();
    res.status(200).send({
      success: true,
      message: "All movies fetched successfully",
      data: allMovies,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from movie controller" + err.message,
    });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movieById = await MovieModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      message: "Movie found successfully",
      data: movieById,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from movie controller" + err.message,
    });
  }
};

//POST
const addMovie = async (req, res) => {
  try {
    // const newMovie = await MovieModel.create(req.body);
    const newMovie = new MovieModel(req.body);
    await newMovie.save();
    res.status(200).send({
      success: true,
      message: "New movie created successfully",
      data: newMovie,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from movie controller" + err.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    await MovieModel.findByIdAndDelete(req.body.movieId);
    return res.status(200).send({
      success: true,
      message: "Movie deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from movie controller" + err.message,
    });
  }
};

//PUT
const updateMovie = async (req, res) => {
  try {
    const updatedMovie = await MovieModel.findByIdAndUpdate(
      req.body.movieId,
      req.body
    );
    console.log('updatedMovie', updatedMovie);
    res.status(200).send({
      success: true,
      message: "Movie updated successfully",
      data: updatedMovie,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from movie controller" + err.message,
    });
  }
};

module.exports = {
  addMovie,
  getAllMovies,
  getMovieById,
  deleteMovie,
  updateMovie,
};
