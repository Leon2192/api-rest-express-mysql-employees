const express = require("express");
const pool = require("./db");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const employeesRoutes = require("./routes/employees.routes");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/", employeesRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint not found",
  });
});

app.listen(3000);
console.log("Server corriendo en el puerto 3000");
