const ShowModel = require("../model/showModel");

// POST
const addShow = async (req, res) => {
  try {
    const newShow = await ShowModel.create(req.body);
    return res.send({
      success: true,
      message: "new show registered successfully",
      data: newShow,
    });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from show controller" + err.message,
    });
  }
};

// PUT
const updateShow = async (req, res) => {
  try {
    const updtedShow = await ShowModel.findByIdAndUpdate(
      req.body.showId,
      req.body
    );
    return res
      .status(200)
      .send({ success: true, message: "Show updated successfully", data: updtedShow });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from show controller" + err.message,
    });
  }
};

// DELETE
const deleteShow = async (req, res) => {
  try {
    await ShowModel.findByIdAndDelete(req.body.showId);
    return res
      .status(200)
      .send({ success: true, message: "show deleted successfully" });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error from show controller" + err.message,
    });
  }
};

// GET
const getShowsByTheatre = async (req, res) => {
  try {
    const shows = await ShowModel.find({
      theatre: req.body.theatreId,
    }).populate("movie");
    return res.status(200).send({
      success: true,
      message: "All shows by theatre",
      data: shows,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Error fetching Shows.",
    });
  }
};

const getShowById = async (req, res) => {
  try {
    const show = await ShowModel.findById(req.body.showId)
      .populate("movie")
      .populate("theatre");
    return res.status(200).send({
      success: true,
      data: show,
      message: "Show by id",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Failed to get show by id",
    });
  }
};

const getAlltheatreByMovieAndDate = async (req, res) => {
  try {
    const { movie, date } = req.body;
    const shows = await ShowModel.find({ movie, date }).populate("theatre");
    const uniqueTheatres = [];
    shows.forEach((show) => {
      const isTheatreUnique = uniqueTheatres.find(
        (theatre) => theatre._id === show.theatre._id
      );

      if (!isTheatreUnique) {
        const showsOftheatre = shows.filter(
          (showObj) => showObj.theatre._id === show.theatre._id
        );
        uniqueTheatres.push({ ...show.theatre._doc, shows: showsOftheatre });
      }
    });
    return res.status(200).send({
      success: true,
      data: uniqueTheatres,
      message: "All theatres by movie",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: "Failed to get all theatres by movie",
    });
  }
};

module.exports = {
  addShow,
  updateShow,
  deleteShow,
  getShowsByTheatre,
  getAlltheatreByMovieAndDate,
  getShowById,
};
