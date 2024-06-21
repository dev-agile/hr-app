"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function resCustom(res, statusCode, message, data) {
    res.status(statusCode).json({
        message: message,
        data: data,
    });
}
exports.default = resCustom;
