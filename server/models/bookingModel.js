const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        show: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "shows",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        seats: {
            type: Array,
            require: true,
        },
        transcationId: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("bookings", bookingSchema);
