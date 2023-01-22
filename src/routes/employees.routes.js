const express = require("express");
const router = express.Router();
const {
  getEmployees,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getEmployee,
} = require("../controllers/employees.controller");

// Rutas

router.get("/ping", async (req, res) => {
  const [result] = await pool.query("SELECT 1 + 1 AS result");
  res.json(result[0]);
});

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployee);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

module.exports = router;
