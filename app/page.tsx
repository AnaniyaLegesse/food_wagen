"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FeaturedMeals from "@/pages/FeaturedMeals";
import Hero from "@/pages/Hero";


const page = () => {
  
  return (
    <div className="min-h-screen font-sans antialiased">
      <Navbar />
      <Hero />
      <FeaturedMeals />   
    </div>
  );
}

export default page