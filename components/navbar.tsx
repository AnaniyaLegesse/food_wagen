import React from 'react'

const navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="text-2xl font-extrabold text-amber-400 tracking-tight">FoodWagon</div>
      <button 
        className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md">
        Add Meal
      </button>
    </div>
  </nav>
  )
}

export default navbar