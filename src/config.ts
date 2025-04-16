// Remove trailing slash from the URL if it exists
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export const API_URL = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl; 