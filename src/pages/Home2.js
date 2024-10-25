import React from 'react';
import Navbar1 from '../Components/Navbar1';
import Hero from '../Components/Hero';
import Features from '../Components/Features';
import AboutSection from '../Components/AboutSection';
import Timeline from '../Components/Timeline';
import CTA from '../Components/CTA';
import ProductVideo from '../Components/ProductVideo';
import WhyChooseUs from '../Components/WhyChooseUs';
import FAQFormSection from '../Components/FAQFormSection';
import Footer from '../Components/Footer';
import PricingBar from '../Components/PricingBar';

const Home = () => {
  return (
    <>
      <Navbar1/>
      <Hero/>
      <Features/>
      <AboutSection/>
      <Timeline/>
      <CTA/>
      <ProductVideo/>
      <WhyChooseUs/>
      <PricingBar/>
      <FAQFormSection/>
      <Footer/>
    </>
  );
};

export default Home;
