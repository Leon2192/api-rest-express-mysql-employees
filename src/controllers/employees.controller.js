const pool = require("../db");

const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM employee");
    res.json(rows);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const getEmployee = async (req, res) => {
  try {
    console.log(req.params.id);
    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    if (rows.length <= 0) {
      return res.status(404).json({
        message: "Employee not found.",
      });
    }
    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const createEmployee = async (req, res) => {
  console.log(req.body);
  const { name, salary } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO employee(name, salary) VALUES (?, ?)",
      [name, salary]
    );
    res.send({
      id: rows.insertId,
      name,
      salary,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, salary } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE employee SET name = IFNULL(?, name),salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Employee nor found",
      });
    }

    const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [
      id,
    ]);
    res.json(rows[0]);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM employee WHERE id = ?", [
      req.params.id,
    ]);
    console.log(result);
    if (result.affecterRows <= 0)
      return res.status(404).json({
        message: "Employee not found",
      });
    res.sendStatus(204);
  } catch (e) {
    return res.status(500).json({
      message: "Something goes wrong",
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
