const express = require("express");
const router = express.Router();
const defectController = require("../controller/defectsController");

// CRUD
router.get("/", defectController.view);
router.get("/defects/:id", defectController.get);

router.post("/defects/Next", defectController.next);
router.post("/defects/Previous", defectController.pre);


module.exports = router;