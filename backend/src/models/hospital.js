const mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema({
    name: String,
    city: String,
    imageUrl: String,
    specialities: [String],
    rating: Number,
    description: String,
    images: [String],
    numberOfDoctors: Number,
    numberOfDepartments: Number,
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
