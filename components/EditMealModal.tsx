import { useState, useEffect } from "react";

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

interface EditMealModalProps {
  meal: Meal;
  onSave: (updated: Partial<Meal> & { id: string }) => void;
  onClose: () => void;
}

const EditMealModal = ({ meal, onSave, onClose }: EditMealModalProps) => {
  const [editState, setEditState] = useState({
    name: meal.name,
    price: meal.price,
    image: meal.image,
  });

  // Reset edit state when modal opens
  useEffect(() => {
    setEditState({ name: meal.name, price: meal.price, image: meal.image });
  }, [meal]);

  const handleSave = () => {
    onSave({ id: meal.id, ...editState });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
        <h2 className="text-lg font-semibold mb-4">Edit Meal</h2>

        <label className="block text-sm text-gray-700 mb-2">
          Name
          <input
            value={editState.name}
            onChange={(e) => setEditState((s) => ({ ...s, name: e.target.value }))}
            className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </label>

        <label className="block text-sm text-gray-700 mb-2">
          Price
          <input
            value={editState.price}
            onChange={(e) => setEditState((s) => ({ ...s, price: e.target.value }))}
            className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </label>

        <label className="block text-sm text-gray-700 mb-4">
          Image URL
          <input
            value={editState.image}
            onChange={(e) => setEditState((s) => ({ ...s, image: e.target.value }))}
            className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 text-white font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMealModal;