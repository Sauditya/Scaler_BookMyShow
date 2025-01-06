const mongoose = require('mongoose');

const DB_URL = process.env.DB_URL;

console.log('printing DB url',DB_URL);

const OPTIONS = {
    family: 4
};

const connectDB = async () => {
    try{
        await mongoose.connect(DB_URL, OPTIONS);
        console.log("DB connected");
    }catch(err){
        console.log("error", err);
    }
}

module.exports = connectDB;