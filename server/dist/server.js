"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = __importDefault(require("./logger")); // Import the logger module
const config_1 = require("./config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = require("./docs");
const routes_1 = __importDefault(require("./routes"));
(0, config_1.connectDB)();
const app = (0, express_1.default)();
const PORT = config_1.envConfig.PORT;
app.use(express_1.default.json());
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.swaggerSpec));
app.use('/api/v1', routes_1.default);
app.listen(PORT, () => {
    logger_1.default.info(`Server is running on http://localhost:${PORT}`);
});
