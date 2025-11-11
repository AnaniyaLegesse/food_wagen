"use client";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import FeaturedMeals from "@/pages/FeaturedMeals";
import Hero from "@/pages/Hero";


const page = () => {
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Navbar />
      <Hero />
      <FeaturedMeals />
      <Footer/>
    </div>
  );
}

export default page