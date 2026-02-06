
import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Features from '../components/Features';
import Portfolio from '../components/Portfolio';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import MobileStickyCTA from '../components/MobileStickyCTA';
import ContextBundler from '../components/ContextBundler';

const LandingPage: React.FC = () => {
  const [isBundlerOpen, setIsBundlerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden selection:bg-amber-500 selection:text-slate-900">
      <Header />
      <main>
        <Hero />
        <Features />
        <Services />
        <Portfolio />
        <ContactForm />
        <Testimonials />
        <FAQ />
      </main>
      <Footer onOpenBundler={() => setIsBundlerOpen(true)} />
      <MobileStickyCTA />
      
      {isBundlerOpen && <ContextBundler onClose={() => setIsBundlerOpen(false)} />}
    </div>
  );
};

export default LandingPage;
