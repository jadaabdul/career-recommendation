const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./docs/swagger");

const routes = require("./routes");

const errorHandler = require("./middleware/error.middleware");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 100,

  message: {
    success: false,
    message: "Too many requests, try again later.",
  },
});

app.use(helmet());

app.use(limiter);

app.use(cors());

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

/* Swagger */

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
