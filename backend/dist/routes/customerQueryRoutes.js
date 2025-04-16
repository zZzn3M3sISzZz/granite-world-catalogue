"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerQueryController_1 = require("../controllers/customerQueryController");
const router = express_1.default.Router();
// Get all customer queries
router.get('/', customerQueryController_1.getCustomerQueries);
// Get a single customer query
router.get('/:id', customerQueryController_1.getCustomerQuery);
// Create a new customer query
router.post('/', customerQueryController_1.createCustomerQuery);
// Update a customer query
router.put('/:id', customerQueryController_1.updateCustomerQuery);
// Delete a customer query
router.delete('/:id', customerQueryController_1.deleteCustomerQuery);
exports.default = router;
