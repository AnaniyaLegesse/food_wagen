import { useState } from "react";

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

interface AddMealModalProps {
  onSave: (meal: Omit<Meal, 'id'> & { id?: string }) => void;
  onClose: () => void;
}

const AddMealModal = ({ onSave, onClose }: AddMealModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    rating: 4.0,
    open: true,
    restaurantName: "",
    restaurant: {
      name: "",
      logo: "",
      isOpen: true
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.price.trim() || !formData.restaurantName.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    onSave(formData);
    onClose();
  };

  const handleChange = (field: string, value: string | number | boolean) => {
    if (field.startsWith('restaurant.')) {
      const restaurantField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        restaurant: {
          ...prev.restaurant,
          [restaurantField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Add New Meal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Meal Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-700">Meal Information</h3>
            
            <label className="block text-sm text-gray-700">
              Meal Name *
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Enter meal name"
                required
              />
            </label>

            <label className="block text-sm text-gray-700">
              Price *
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange('price', e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="e.g., 12.99"
                required
              />
            </label>

            <label className="block text-sm text-gray-700">
              Image URL
              <input
                type="url"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="https://example.com/image.jpg"
              />
            </label>

            <label className="block text-sm text-gray-700">
              Rating
              <select
                value={formData.rating}
                onChange={(e) => handleChange('rating', parseFloat(e.target.value))}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
              >
                <option value={3.0}>3.0 ★</option>
                <option value={3.5}>3.5 ★</option>
                <option value={4.0}>4.0 ★</option>
                <option value={4.5}>4.5 ★</option>
                <option value={5.0}>5.0 ★</option>
              </select>
            </label>
          </div>

          {/* Restaurant Information */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-medium text-gray-700">Restaurant Information</h3>
            
            <label className="block text-sm text-gray-700">
              Restaurant Name *
              <input
                type="text"
                value={formData.restaurantName}
                onChange={(e) => handleChange('restaurantName', e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="Enter restaurant name"
                required
              />
            </label>

            <label className="block text-sm text-gray-700">
              Restaurant Logo URL
              <input
                type="url"
                value={formData.restaurant.logo}
                onChange={(e) => handleChange('restaurant.logo', e.target.value)}
                className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400"
                placeholder="https://example.com/logo.jpg"
              />
            </label>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isOpen"
                checked={formData.open}
                onChange={(e) => handleChange('open', e.target.checked)}
                className="rounded border-gray-300 text-orange-500 focus:ring-orange-400"
              />
              <label htmlFor="isOpen" className="text-sm text-gray-700">
                Restaurant is currently open
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 text-white font-medium transition duration-200"
            >
              Add Meal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMealModal;