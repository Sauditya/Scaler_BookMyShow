const ShowRouter = require("express").Router();

const {
    addShow,
    updateShow,
    deleteShow,
    getShowsByTheatre,
    getShowsByMovies
} = require("../controllers/showController");

// POST
ShowRouter.post("/add-show", addShow);

ShowRouter.post("/delete-show", deleteShow);

// GET
ShowRouter.get("/get-show-by-theatre", getShowsByTheatre);
ShowRouter.get("/get-show-by-movie", getShowsByMovies);
//PUT
ShowRouter.put("/update-show", updateShow);

module.exports = ShowRouter;