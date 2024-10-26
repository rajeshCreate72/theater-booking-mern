const mongoose = require("mongoose");

const showSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "movies",
        required: true,
    },
    ticketPrice: {
        type: String,
        required: true,
    },
    totalSeats: {
        type: String,
        required: true,
    },
    bookedSeats: {
        type: String,
        required: true,
    },
    theaters: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "theaters",
        required: true,
    },
});

module.exports = mongoose.model("shows", showSchema);
