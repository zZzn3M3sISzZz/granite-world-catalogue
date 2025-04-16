import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from './ProductCard';

// Sample data - replace with actual data
const sampleProducts = [
  {
    id: 1,
    name: 'Black Galaxy',
    description: 'A stunning black granite with golden specks that create a galaxy-like appearance.',
    category: 'Black',
    finish: 'Polished',
    images: [
      { url: '/products/black-galaxy-1.jpg', alt: 'Black Galaxy Granite' },
      { url: '/products/black-galaxy-2.jpg', alt: 'Black Galaxy Granite Detail' },
    ],
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Thickness', value: '20mm' },
      { label: 'Finish', value: 'Polished' },
      { label: 'Color', value: 'Black with golden specks' },
    ],
  },
  // Add more sample products here
];

const categories = ['All', 'Black', 'White', 'Brown', 'Gray', 'Green'];
const finishes = ['All', 'Polished', 'Honed', 'Leathered', 'Brushed'];

const Catalogue: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return sampleProducts.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesFinish = selectedFinish === 'All' || product.finish === selectedFinish;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesFinish && matchesSearch;
    });
  }, [selectedCategory, selectedFinish, searchQuery]);

  return (
    <section id="catalogue" className="section">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          Our Catalogue
        </motion.h2>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-primary-light hover:bg-gray-200 dark:hover:bg-primary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {finishes.map((finish) => (
              <button
                key={finish}
                onClick={() => setSelectedFinish(finish)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFinish === finish
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 dark:bg-primary-light hover:bg-gray-200 dark:hover:bg-primary'
                }`}
              >
                {finish}
              </button>
            ))}
          </div>

          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 rounded-lg border dark:bg-primary-light dark:border-gray-700"
            />
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600 dark:text-gray-300">
              No products found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Catalogue; 