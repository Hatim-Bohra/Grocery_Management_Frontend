import React from 'react';
import { Navbar } from '../../components/Layout/Navbar';
import { Footer } from '../../components/Layout/Footer';
import { Hero } from '../../components/Home/Hero';
import { FeaturedProducts } from '../../components/Home/FeaturedProducts';

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">
        <Hero />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
};
