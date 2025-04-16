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
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Get all products
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Exclude the general inquiry product from the main products list
        const products = yield Product_1.default.find({ name: { $ne: 'General Inquiry' } });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching products' });
    }
}));
// Get featured products (limited to 5)
router.get('/featured', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const featuredProducts = yield Product_1.default.find({
            featured: true,
            name: { $ne: 'General Inquiry' }
        }).limit(5);
        res.json(featuredProducts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured products' });
    }
}));
// Get general product
router.get('/general', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const generalProduct = yield Product_1.default.findOne({ name: 'General Inquiry' });
        if (!generalProduct) {
            return res.status(404).json({ message: 'General product not found' });
        }
        res.json(generalProduct);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching general product' });
    }
}));
// Get product by ID
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching product' });
    }
}));
// Create product
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new Product_1.default(req.body);
        yield product.save();
        res.status(201).json(product);
    }
    catch (error) {
        res.status(400).json({ message: 'Error creating product' });
    }
}));
// Update product
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(400).json({ message: 'Error updating product' });
    }
}));
// Delete product
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting product' });
    }
}));
exports.default = router;
