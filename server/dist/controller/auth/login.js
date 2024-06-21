"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../model");
const utils_1 = require("../../utils");
const constants_1 = require("../../constants");
const bcrypt_1 = require("../../utils/bcrypt");
const token_genretor_1 = require("../../utils/token-genretor");
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield model_1.UserRole.findOne({ email: email });
    if (!user) {
        (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.NOT_FOUND, constants_1.RESPONSE_MESSAGES.NOT_FOUND, null);
    }
    const userInfo = yield model_1.employeeModel.Employee.default.findOne({ email: email });
    const passCompare = (0, bcrypt_1.comparePassword)(password, userInfo === null || userInfo === void 0 ? void 0 : userInfo.password);
    if (!passCompare) {
        (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.UNAUTHORIZED, constants_1.RESPONSE_MESSAGES.UNAUTHORIZED, null);
    }
    const accessToken = (0, token_genretor_1.generateAccessToken)(userInfo._id);
    const refreshToken = (0, token_genretor_1.generateRefreshToken)(userInfo._id);
    yield (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.OK, constants_1.RESPONSE_MESSAGES.DATA_FETCHED, { access_token: accessToken, refresh_token: refreshToken, userInfo });
});
exports.default = login;
