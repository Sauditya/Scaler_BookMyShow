
const ShowModel = require("../model/showModel");

// POST
const addShow = async (req, res) => {
    try {
        const newShow = await ShowModel.create(req.body);
        return res.send({
            success: true,
            message: "new show registered successfully",
        })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error from theatre controller" + err.message,
        });
    }
}

// PUT
const updateShow = async (req, res) => {
    try {
        await ShowModel.findByIdAndUpdate(req.params.id,req.body);
        return res.status(200).json({ message: "Show updated successfully" });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error from theatre controller" + err.message,
        });
    }
}

// DELETE
const deleteShow = async (req, res) => {
    try {
        await ShowModel.findByIdAndDelete(req.body.showId);
        return res.status(200).json({ message: "show deleted successfully" });
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "Error from theatre controller" + err.message,
        });
    }

}

// GET
const getShowsByTheatre = async (req, res) => {
    try{
        const shows = await ShowModel.findOne({theatre : req.body.theatreId});;
        return res.status(200).json(shows);

    }catch(err){
        return res.status(500).send({
            success: false,
            message: 'Error fetching Shows.',
        });
    }
};

const getShowsByMovies = async (req, res) => {
    try{
        const shows = await ShowModel.findOne({theatre : req.body.movieId});;
        return res.status(200).json(shows);

    }catch(err){
        return res.status(500).send({
            success: false,
            message: 'Error fetching Shows.',
        });
    }
};

const getAlltheatreByMovieAndDate = async (req, res) => {
    try{
        const movieId = req.body.movieId;
        const date = req.body.date;
        const shows = await ShowModel.find({movie: movieId});
        const showsFilterByDate = shows.filter(show=>{
            const {time}= show;
            const showDate = time;
            return date===showDate
        })
        return res.status(200).json(shows);

    }catch(err){
        return res.status(500).send({
            success: false,
            message: 'Error fetching Shows.',
        });
    }
};


module.exports = { addShow, updateShow, deleteShow, getShowsByTheatre, getShowsByMovies };
