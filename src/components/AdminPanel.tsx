import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

interface CustomerQuery {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  productId: string;
  createdAt: string;
}

interface GalleryPost {
  _id: string;
  imageUrl: string;
  caption: string;
  description: string;
  tags: string[];
  likes: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'queries' | 'gallery'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [queries, setQueries] = useState<CustomerQuery[]>([]);
  const [galleryPosts, setGalleryPosts] = useState<GalleryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'products') {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } else if (activeTab === 'queries') {
        const response = await fetch('http://localhost:5000/api/customer-queries');
        if (!response.ok) throw new Error('Failed to fetch queries');
        const data = await response.json();
        setQueries(data);
      } else {
        const response = await fetch('http://localhost:5000/api/gallery');
        if (!response.ok) throw new Error('Failed to fetch gallery posts');
        const data = await response.json();
        setGalleryPosts(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete product');
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product');
    }
  };

  const handleDeleteQuery = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this query?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/customer-queries/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete query');
      setQueries(queries.filter(query => query._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete query');
    }
  };

  const handleDeleteGalleryPost = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this gallery post?')) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete gallery post');
      setGalleryPosts(galleryPosts.filter(post => post._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete gallery post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('products')}
                  className={`${
                    activeTab === 'products'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Products
                </button>
                <button
                  onClick={() => setActiveTab('queries')}
                  className={`${
                    activeTab === 'queries'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Customer Queries
                </button>
                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`${
                    activeTab === 'gallery'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Gallery
                </button>
              </nav>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {loading ? (
              <div className="mt-4 flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              </div>
            ) : (
              <div className="mt-6">
                {activeTab === 'products' ? (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            {product.description}
                          </p>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">
                              ${product.price}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {product.category}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : activeTab === 'queries' ? (
                  <div className="space-y-6">
                    {queries.map((query) => (
                      <motion.div
                        key={query._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-700 shadow rounded-lg p-6"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {query.name}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                              {query.email} • {query.phone}
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {new Date(query.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-4 text-gray-700 dark:text-gray-300">
                          {query.message}
                        </p>
                        <button
                          onClick={() => handleDeleteQuery(query._id)}
                          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          Delete
                        </button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {galleryPosts.map((post) => (
                      <motion.div
                        key={post._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden"
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.caption}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {post.caption}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                            {post.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {post.likes} likes
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {post.featured ? 'Featured' : 'Not featured'}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteGalleryPost(post._id)}
                            className="mt-4 w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 