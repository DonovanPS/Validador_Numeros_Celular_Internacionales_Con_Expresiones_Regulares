"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const indexController_1 = __importDefault(require("../controllers/indexController"));
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.indexController = new indexController_1.default();
        this.config();
    }
    config() {
        this.router.get('/validatePhoneNumber', this.indexController.validatePhoneNumber);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
