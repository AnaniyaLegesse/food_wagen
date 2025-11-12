import React, { useState } from 'react';
import AddMealModal from './AddMealModal';

interface Meal {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number;
  open: boolean;
  restaurantName: string;
  restaurant?: {
    name: string;
    logo: string;
    isOpen: boolean;
  };
}

interface NavbarProps {
  onAddMeal?: (meal: Omit<Meal, 'id'> & { id?: string }) => void;
}

const Navbar = ({ onAddMeal }: NavbarProps) => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddMeal = (newMeal: Omit<Meal, 'id'> & { id?: string }) => {
    // Pass the new meal data to the parent component
    onAddMeal?.(newMeal);
    setShowAddModal(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold text-amber-400 tracking-tight">FoodWagon</div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-md"
          >
            Add Meal
          </button>
        </div>
      </nav>

      {/* Add Meal Modal */}
      {showAddModal && (
        <AddMealModal
          onSave={handleAddMeal}
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  );
}

export default Navbar;