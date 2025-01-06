const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');

const getCurrentUser = async (req, res) => {
    try{
        const user =  await userModel.findById(req.body.userId).select("-password");

        return res.status(200).send({
            success: true,
            data: user,
            message: 'You are authorized person',
        })

    }catch(err){
        return res.status(500).send({
            success: false,
            message: 'Error fetching user.',
        });
    }
};

const login = async (req, res) => {
    try{
        console.log('login controller is called');
        const user = await userModel.findOne({email: req.body.email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "user does not exist",
            })
        }
        if(req.body.password !== user.password){
            return res.status(401).send({
                success: false,
                message: "Sorry, Invalid Password! please try again",
            })
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{
            expiresIn: '10d'
        })
        
        return res.status(200).send({
            success: true,
            message: `You have successfully logged in. Welcome ${user.name}`,
            data: token,
        })

    }catch(err){
        return res.status(500).send({
            success: false,
            message: 'An error occurd. Please try again.' + err,
        });
    }
};


const register = async (req, res) => {
    try{
        const userExists = await userModel.findOne({email: req.body.email});

        if(userExists){
            return res.send({
                success: false,
                message: "user already registered",
            })
        }

        const newUser = await userModel.create(req.body);
        
        //   return res.status(201).json({ message: "User created successfully", newUser });
        return res.send({
            success: true,
            message: "user registered successfully",
        })
        
    }catch(err){
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getCurrentUser,
    login,
    register
}
