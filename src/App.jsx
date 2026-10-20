import { useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Categories from './components/Categories.jsx';
import Collection from './components/Collection.jsx';
import BrandStory from './components/BrandStory.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';

export default function App() {
  // 'all' or a category id. Shared so the category list can drive the product grid.
  const [activeCategory, setActiveCategory] = useState('all');

  const chooseCategory = (id) => {
    setActiveCategory(id);
    document.getElementById('collection')?.scrollIntoView();
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-saffron focus:px-4 focus:py-3 focus:font-display focus:font-bold focus:text-indigo-deep"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Categories activeCategory={activeCategory} onChoose={chooseCategory} />
        <Collection activeCategory={activeCategory} onChange={setActiveCategory} />
        <BrandStory />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
