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
exports.deleteCustomerQuery = exports.updateCustomerQuery = exports.createCustomerQuery = exports.getCustomerQuery = exports.getCustomerQueries = void 0;
const CustomerQuery_1 = __importDefault(require("../models/CustomerQuery"));
// Get all customer queries
const getCustomerQueries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queries = yield CustomerQuery_1.default.find()
            .populate('productId')
            .sort({ createdAt: -1 });
        res.json(queries);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching customer queries', error });
    }
});
exports.getCustomerQueries = getCustomerQueries;
// Get a single customer query
const getCustomerQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield CustomerQuery_1.default.findById(req.params.id).populate('productId');
        if (!query) {
            return res.status(404).json({ message: 'Customer query not found' });
        }
        res.json(query);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching customer query', error });
    }
});
exports.getCustomerQuery = getCustomerQuery;
// Create a new customer query
const createCustomerQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = new CustomerQuery_1.default(req.body);
        const savedQuery = yield query.save();
        res.status(201).json(savedQuery);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating customer query', error });
    }
});
exports.createCustomerQuery = createCustomerQuery;
// Update a customer query
const updateCustomerQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield CustomerQuery_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('productId');
        if (!query) {
            return res.status(404).json({ message: 'Customer query not found' });
        }
        res.json(query);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating customer query', error });
    }
});
exports.updateCustomerQuery = updateCustomerQuery;
// Delete a customer query
const deleteCustomerQuery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = yield CustomerQuery_1.default.findByIdAndDelete(req.params.id);
        if (!query) {
            return res.status(404).json({ message: 'Customer query not found' });
        }
        res.json({ message: 'Customer query deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting customer query', error });
    }
});
exports.deleteCustomerQuery = deleteCustomerQuery;
