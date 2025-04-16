import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import AdminGallery from './AdminGallery';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  featured: boolean;
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

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'queries' | 'gallery'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [queries, setQueries] = useState<CustomerQuery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAdminAuth();

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
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

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

  const handleToggleFeatured = async (id: string, currentFeatured: boolean) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featured: !currentFeatured }),
      });
      
      if (!response.ok) throw new Error('Failed to update product');
      
      const updatedProduct = await response.json();
      setProducts(products.map(product => 
        product._id === id ? updatedProduct : product
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update product');
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

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h2>
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
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

            {activeTab === 'gallery' ? (
              <AdminGallery />
            ) : (
              <>
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
                              <div className="mt-4 flex space-x-2">
                                <button
                                  onClick={() => handleToggleFeatured(product._id, product.featured)}
                                  className={`flex-1 px-4 py-2 rounded-md text-sm font-medium ${
                                    product.featured
                                      ? 'bg-green-600 text-white hover:bg-green-700'
                                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
                                  }`}
                                >
                                  {product.featured ? 'Featured' : 'Mark as Featured'}
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(product._id)}
                                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
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
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel; 