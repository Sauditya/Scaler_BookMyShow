const mongoose = require("mongoose");

const showSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        movie: {
            tyep: mongoose.Schema.Types.ObjectId,
            ref: 'movies',
            required: true,
        },
        theatre : {
            tyep: mongoose.Schema.Types.ObjectId,
            ref: 'theatre',
            required: true,
        },
        ticketPrice: {
            type: Number,
            required: true,
        },
        bookedSeats: {
            type: Array,
            default: [],
        },
        totalSeats: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("shows", showSchema);