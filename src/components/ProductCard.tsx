import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ProductImage {
  url: string;
  alt: string;
}

interface ProductSpec {
  label: string;
  value: string;
}

interface ProductCardProps {
  name: string;
  description: string;
  images: ProductImage[];
  specs: ProductSpec[];
  category: string;
  finish: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  images,
  specs,
  category,
  finish,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        className="bg-white dark:bg-primary-light rounded-lg overflow-hidden shadow-lg"
      >
        <div className="relative group">
          <img
            src={images[0].url}
            alt={images[0].alt}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary"
            >
              View Details
            </button>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-display font-bold mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 dark:bg-primary rounded-full text-sm">
              {category}
            </span>
            <span className="px-3 py-1 bg-gray-100 dark:bg-primary rounded-full text-sm">
              {finish}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            className="relative z-50"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="mx-auto max-w-4xl w-full bg-white dark:bg-primary rounded-xl overflow-hidden">
                <div className="relative">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>

                  <div className="relative h-96">
                    <img
                      src={images[currentImageIndex].url}
                      alt={images[currentImageIndex].alt}
                      className="w-full h-full object-cover"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={previousImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          ←
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                        >
                          →
                        </button>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <Dialog.Title className="text-2xl font-display font-bold mb-4">
                      {name}
                    </Dialog.Title>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {description}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {specs.map((spec, index) => (
                        <div key={index} className="flex justify-between">
                          <span className="font-medium">{spec.label}:</span>
                          <span>{spec.value}</span>
                        </div>
                      ))}
                    </div>

                    <form className="space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded-md dark:bg-primary-light dark:border-gray-700"
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full p-2 border rounded-md dark:bg-primary-light dark:border-gray-700"
                      />
                      <textarea
                        placeholder="Your Message"
                        rows={4}
                        className="w-full p-2 border rounded-md dark:bg-primary-light dark:border-gray-700"
                      />
                      <button type="submit" className="btn-primary w-full">
                        Send Enquiry
                      </button>
                    </form>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard; 