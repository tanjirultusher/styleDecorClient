import React, { useEffect } from 'react';
import HeroSection from '../HeroSection/HeroSection';


const Home = () => {

  useEffect(()=>{
    document.title = "Home";
  })
  return (
    <>
      <HeroSection></HeroSection>
    </>
  );
};

export default Home;