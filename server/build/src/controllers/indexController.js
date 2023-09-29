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
const indexService_1 = __importDefault(require("../services/indexService"));
class IndexController {
    constructor() {
        this.indexService = new indexService_1.default();
        this.validatePhoneNumber = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const phone = req.headers.phone;
            try {
                const resp = yield this.indexService.validatePhoneNumber(phone);
                res.status(200).json({
                    success: true,
                    response: resp,
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const table = req.headers.table;
            try {
                const resp = yield this.indexService.getAll(table);
                res.status(200).json({
                    success: true,
                    response: resp,
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const table = req.headers.table;
            try {
                const resp = yield this.indexService.create(table, req.body);
                res.status(200).json({
                    success: true,
                    response: resp,
                });
            }
            catch (err) {
                res.status(400).json({
                    success: false,
                    message: err,
                });
            }
        });
    }
}
exports.default = IndexController;
