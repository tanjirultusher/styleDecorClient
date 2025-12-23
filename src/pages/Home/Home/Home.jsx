import React, { useEffect } from 'react';
import HeroSection from '../HeroSection/HeroSection';
import TopServices from '../TopServicesSection/TopServices';
import TopDecorators from '../TopDecoratorsSection/TopDecorators';


const Home = () => {

  useEffect(()=>{
    document.title = "Home";
  })
  return (
    <>
      <HeroSection></HeroSection>
      <TopServices></TopServices>
      <TopDecorators></TopDecorators>
    </>
  );
};

export default Home;