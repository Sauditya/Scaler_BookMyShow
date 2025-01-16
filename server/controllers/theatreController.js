const TheatreModel = require("../models/theatreModel");

//GET
const getAllTheatres = async (req, res) => {
  try {
    const allTheatres = await TheatreModel.find().populate('owner');
    res.status(200).send({
      success: true,
      message: "All theatres fetched successfully",
      data: allTheatres,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from theatre controller" + err.message,
    });
  }
};

const getTheatreByOwner = async (req, res) => {
  try {
    const allTheatresByOwnerId = await TheatreModel.find({ owner: req.params.ownerId });
    res.status(200).send({
      success: true,
      message: "Theatre found successfully",
      data: allTheatresByOwnerId,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from theatre controller" + err.message,
    });
  }
};

//POST
const addTheatre = async (req, res) => {
  try {
    // const newMovie = await TheatreModel.create(req.body);
    const newMovie = new TheatreModel(req.body);
    await newMovie.save();
    res.status(200).send({
      success: true,
      message: "New Theatre register successfully",
      data: newMovie,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from theatre controller" + err.message,
    });
  }
};

const deleteTheatre = async (req, res) => {
  try {
    await TheatreModel.findByIdAndDelete(req.params.theatreId);
    return res.status(200).send({
      success: true,
      message: "Theatre deleted successfully",
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from theatre controller" + err.message,
    });
  }
};

//PUT
const updateTheatre = async (req, res) => {
  try {
    const updatedTheatre = await TheatreModel.findByIdAndUpdate(
      req.body.theatreId,
      req.body
    );
    console.log('updatedTheatre', updatedTheatre);
    res.status(200).send({
      success: true,
      message: "Theatre data updated successfully",
      data: updatedTheatre,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from theatre controller" + err.message,
    });
  }
};

module.exports = {
  addTheatre,
  getAllTheatres,
  getTheatreByOwner,
  deleteTheatre,
  updateTheatre,
};
