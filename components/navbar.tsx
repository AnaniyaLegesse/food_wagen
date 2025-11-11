import React from 'react'

const navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 shadow-md'>
        <h1 className='text-2xl text-amber-400'>FoodWagen</h1>
        
        <button 
            className='bg-amber-400 px-4 py-2 rounded-md text-white font-semibold hover:bg-amber-500 transition'
          >
            Add Meal
        </button>

    </div>
  )
}

export default navbar