const express = require("express");
const {
  getCurrentUser,
  login,
  register
} = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");


const userRouter = express.Router();


//POST
userRouter.post('/register', register);
userRouter.post('/login', login);

//GET
userRouter.get('/get-current-user',auth, getCurrentUser);


module.exports = userRouter;