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
const GalleryPost_1 = __importDefault(require("../models/GalleryPost"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Get all gallery posts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield GalleryPost_1.default.find().sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching gallery posts', error });
    }
}));
// Get featured gallery posts
router.get('/featured', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield GalleryPost_1.default.find({ featured: true }).sort({ createdAt: -1 });
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching featured gallery posts', error });
    }
}));
// Get a single gallery post
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield GalleryPost_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Gallery post not found' });
        }
        res.json(post);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching gallery post', error });
    }
}));
// Create a new gallery post (protected route)
router.post('/', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, caption, description, tags, featured } = req.body;
        const newPost = new GalleryPost_1.default({
            imageUrl,
            caption,
            description,
            tags,
            featured,
        });
        const savedPost = yield newPost.save();
        res.status(201).json(savedPost);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating gallery post', error });
    }
}));
// Update a gallery post (protected route)
router.put('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { imageUrl, caption, description, tags, featured } = req.body;
        const updatedPost = yield GalleryPost_1.default.findByIdAndUpdate(req.params.id, { imageUrl, caption, description, tags, featured }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Gallery post not found' });
        }
        res.json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating gallery post', error });
    }
}));
// Delete a gallery post (protected route)
router.delete('/:id', auth_1.authenticateToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedPost = yield GalleryPost_1.default.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Gallery post not found' });
        }
        res.json({ message: 'Gallery post deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting gallery post', error });
    }
}));
exports.default = router;
