import { Handbag, Home, Motorbike, Search, Truck } from 'lucide-react'
import { useState } from 'react';


const Hero = () => {
  const [mode, setMode] = useState('Delivery');
  const activeClass = "bg-orange-100 text-orange-600 shadow-lg";
  const inactiveClass = "bg-white text-gray-500 hover:bg-orange-100";

  return (
    <section className="pt-10 lg:p-12 bg-amber-400 min-h-[400px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 flex flex-col lg:flex-row items-center justify-between">

        {/* Left Content (Text and Form) */}
        <div className="lg:w-1/2 mb-10 lg:mb-0 text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            Are you starving?
          </h1>
          <p className="mt-4 text-lg font-medium">
            Within a few clicks, find meals that are accessible near you.
          </p>

          {/* Search Form Card */}
          <div className="mt-8 bg-white p-6 rounded-3xl shadow-xl w-full max-w-lg">
            {/* Toggle Buttons */}
            <div className="flex space-x-2 p-1 rounded-xl mb-4">
              <button
                onClick={() => setMode('Delivery')}
                className={`flex-1 flex items-center justify-center p-3 font-semibold rounded-xl transition duration-300 ${mode === 'Delivery' ? activeClass : inactiveClass}`}
              >
                <Motorbike size={20} className="mr-2" /> Delivery
              </button>
              <button
                onClick={() => setMode('Pickup')}
                className={`flex-1 flex items-center justify-center p-3 font-semibold rounded-xl transition duration-300 ${mode === 'Pickup' ? activeClass : inactiveClass}`}
              >
                <Handbag size={20} className="mr-2" /> Pickup
              </button>
            </div>

            {/* Input and Search Button */}
            <div className="flex space-x-2">
              <div className="relative flex-grow">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="What do you like to eat today?"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-0 text-gray-800"
                />
              </div>
              <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold py-3 px-6 rounded-xl shadow-md transition duration-300 flex items-center justify-center">
               <Search size={20} className="mr-2" /> Find Meal
              </button>
            </div>
          </div>
        </div>

        {/* Right Image (Placeholder for Food) */}
        <div className="lg:w-2/5 flex justify-center">
          <img
            src="/noodles.svg"
            alt="Delicious Noodles"
            className="rounded-full object-cover shadow-2xl border-4 border-white hidden lg:block"
          />
        </div>

      </div>
    </section>
  )
}

export default Hero