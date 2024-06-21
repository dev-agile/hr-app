"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const accessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, constants_1.RESPONSE_MESSAGES.UNAUTHORIZED, null);
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = (0, jwt_1.verifyAccessToken)(token);
        req.userId = payload.userId; // Attach userId to the request object for further use
        next();
    }
    catch (error) {
        return (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, "invalid token", null);
    }
};
exports.default = accessToken;
