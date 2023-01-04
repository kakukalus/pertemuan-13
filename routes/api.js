// Import Student Controller
const StudentController = require("../controllers/StudentController");

// Membuat router modular
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello Express");
});

// Membuat rounting untuk students
router.get("/students", StudentController.index);
router.post("/students", StudentController.store);
router.put("/students/:id", StudentController.update);
router.delete("/students/:id", StudentController.destroy);
router.get("/students/:id", StudentController.show);

// Export router
module.exports = router;
