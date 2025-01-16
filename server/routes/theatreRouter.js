const theatreRouter = require('express').Router();
const {  addTheatre,
    getAllTheatres,
    getTheatreByOwner,
    deleteTheatre,
    updateTheatre} = require('../controllers/theatreController');


//GET
theatreRouter.get('/get-all-theatres', getAllTheatres);
theatreRouter.get('/get-all-theatre-by-owner/:ownerId', getTheatreByOwner);

//POSt
theatreRouter.post('/add-theatre', addTheatre);
theatreRouter.post('/delete-theatre/:theatreId', deleteTheatre);

//PUT
theatreRouter.put('/update-theatre', updateTheatre);


module.exports = theatreRouter;