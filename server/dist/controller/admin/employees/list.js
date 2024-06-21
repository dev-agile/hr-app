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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = require("../../../model");
const utils_1 = require("../../../utils");
const constants_1 = require("../../../constants");
const paginate_1 = __importDefault(require("../../../plugin/paginate"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, paginate_1.default)(model_1.employeeModel.Employee.default);
    (0, utils_1.resCustom)(res, constants_1.HTTP_STATUS.OK, constants_1.RESPONSE_MESSAGES.DATA_FETCHED, data);
});
exports.default = list;
