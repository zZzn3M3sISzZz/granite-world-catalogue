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
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Product_1 = __importDefault(require("../models/Product"));
dotenv_1.default.config();
const createGeneralProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/granite-world');
        // Check if general product already exists
        const existingProduct = yield Product_1.default.findOne({ name: 'General Inquiry' });
        if (existingProduct) {
            console.log('General product already exists');
            return existingProduct._id;
        }
        // Create general product
        const generalProduct = yield Product_1.default.create({
            name: 'General Inquiry',
            description: 'General contact form submission',
            price: 0,
            category: 'General',
            imageUrl: '/images/general-inquiry.jpg',
        });
        console.log('General product created successfully:', generalProduct._id);
        return generalProduct._id;
    }
    catch (error) {
        console.error('Error creating general product:', error);
        throw error;
    }
    finally {
        yield mongoose_1.default.disconnect();
    }
});
// Run the script
createGeneralProduct()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error(error);
    process.exit(1);
});
