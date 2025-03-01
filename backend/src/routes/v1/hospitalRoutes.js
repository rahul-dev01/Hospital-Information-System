const express = require("express");
const hospitalController = require("../../controller/hostpitalController");
const { authMiddleware, adminMiddleware } = require("../../middleware/authMiddleware");

const router = express.Router();


router.post("/create", authMiddleware, adminMiddleware, hospitalController.createHospital);
router.get("/", authMiddleware, hospitalController.getHospitalsByCity);
router.put("/update", authMiddleware, adminMiddleware, hospitalController.updateHospital);
router.delete("/delete", authMiddleware, adminMiddleware, hospitalController.deleteHospital);
router.post("/details", authMiddleware, hospitalController.addHospitalDetails);

module.exports = router;
