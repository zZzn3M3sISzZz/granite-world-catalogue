import React from 'react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  const features = [
    {
      title: 'Premium Quality',
      description: 'We source only the finest granite from renowned quarries worldwide.',
      icon: '✨',
    },
    {
      title: 'Expert Craftsmanship',
      description: 'Our skilled artisans ensure perfect finishing and installation.',
      icon: '🔨',
    },
    {
      title: 'Wide Selection',
      description: 'Choose from hundreds of unique patterns and colors.',
      icon: '🎨',
    },
    {
      title: 'Customer Service',
      description: 'Dedicated support throughout your project journey.',
      icon: '🤝',
    },
  ];

  return (
    <section id="about" className="section bg-secondary-dark dark:bg-primary-light">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            The Granite World has been transforming spaces with premium granite solutions for over two decades.
            Our commitment to quality and customer satisfaction sets us apart in the industry.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-display font-bold">Our Story</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Founded in 2000, The Granite World began with a simple mission: to provide
              homeowners and businesses with the highest quality granite products and
              exceptional service. What started as a small showroom has grown into a
              trusted name in the industry.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Today, we continue to uphold our founding principles while embracing
              innovation and sustainable practices. Our team of experts works closely
              with clients to bring their vision to life, ensuring every project
              reflects our commitment to excellence.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative h-64 md:h-auto"
          >
            <div className="absolute inset-0 bg-cover bg-center rounded-lg shadow-lg"
                 style={{ backgroundImage: 'url("/about-image.jpg")' }} />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-primary p-6 rounded-lg shadow-lg text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-display font-bold mb-6">Our Commitment</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            At The Granite World, we believe in building lasting relationships with our
            clients. Our commitment to quality, integrity, and customer satisfaction
            drives everything we do. We're not just selling granite; we're helping
            you create beautiful, lasting spaces that you'll love for years to come.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 