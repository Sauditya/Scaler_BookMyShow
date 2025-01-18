const ShowRouter = require("express").Router();

const {
    addShow,
    updateShow,
    deleteShow,
    getShowsByTheatre,
    getAlltheatreByMovieAndDate,
    getShowById
} = require("../controllers/showController");

// POST
ShowRouter.post("/add-show", addShow);

ShowRouter.post("/delete-show", deleteShow);

// GET
ShowRouter.post("/get-all-shows-by-theatre", getShowsByTheatre);
ShowRouter.post("/get-show-by-id",getShowById)
ShowRouter.post("/get-all-theatres-by-movie", getAlltheatreByMovieAndDate);
//PUT
ShowRouter.put("/update-show", updateShow);

module.exports = ShowRouter;