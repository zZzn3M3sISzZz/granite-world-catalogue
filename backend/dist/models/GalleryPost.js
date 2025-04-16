"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const galleryPostSchema = new mongoose_1.default.Schema({
    imageUrl: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    tags: [{
            type: String,
        }],
    likes: {
        type: Number,
        default: 0,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
// Update the updatedAt field before saving
galleryPostSchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});
const GalleryPost = mongoose_1.default.model('GalleryPost', galleryPostSchema);
exports.default = GalleryPost;
