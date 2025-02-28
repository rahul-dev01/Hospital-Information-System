const Hospital = require("../models/hospital")


exports.createHospital = async (req, res) => {
    try {
      const newHospital = new Hospital(req.body);
      await newHospital.save();
      res.status(201).json(newHospital);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.getHospitalsByCity = async (req, res) => {
    try {
      const { city } = req.query;
      const hospitals = await Hospital.find({ city });
      res.status(200).json(hospitals);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteHospital = async (req, res) => {
    try {
      const { id } = req.query;
      await Hospital.findByIdAndDelete(id);
      res.status(200).json({ message: "Hospital deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.updateHospital = async (req, res) => {
    try {
      const { id } = req.query;
      const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedHospital);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.addHospitalDetails = async (req, res) => {
    try {
      const { id } = req.query;
      const updatedHospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json(updatedHospital);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };