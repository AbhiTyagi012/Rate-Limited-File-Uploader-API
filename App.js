const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const createSwaggerSpec = require("./API/config/swagger");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

// Swagger UI — server URL is built from the actual PORT so "Try it out" works
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(createSwaggerSpec(PORT)));

// API Routes
const routes = require("./API/Routes/App_routes");
app.use("/api", routes);

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Rate Limited File Uploader API", docs: "/api-docs" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs  → http://localhost:${PORT}/api-docs`);
});
