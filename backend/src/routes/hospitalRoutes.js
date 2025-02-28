const express = require("express");
const router = express.Router();
const hospitalController = require("../controller/hostpitalController");
const { authMiddleware, adminMiddleware } = require("../middleware/authMiddleware")

router.post("/create", authMiddleware, adminMiddleware, hospitalController.createHospital); 
router.get("/", authMiddleware, hospitalController.getHospitalsByCity);
router.delete("/delete", authMiddleware, adminMiddleware, hospitalController.deleteHospital);
router.put("/update", authMiddleware, adminMiddleware, hospitalController.updateHospital);
router.post("/details", authMiddleware, hospitalController.addHospitalDetails);

module.exports = router;