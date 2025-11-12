import { useState } from "react";

interface AddMealModalProps {
  onSave: (meal: any) => void;
  onClose: () => void;
  isLoading?: boolean;
}

const AddMealModal = ({ onSave, onClose, isLoading = false }: AddMealModalProps) => {
  const [formData, setFormData] = useState({
    food_name: "",
    food_rating: 4.0,
    food_image: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open Now"
  });

  const [errors, setErrors] = useState({
    food_name: "",
    food_rating: "",
    food_image: "",
    restaurant_name: ""
  });

  const validateForm = () => {
    const newErrors = {
      food_name: "",
      food_rating: "",
      food_image: "",
      restaurant_name: ""
    };

    let isValid = true;

    // Food Name validation
    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required";
      isValid = false;
    }

    // Food Rating validation
    const rating = parseFloat(formData.food_rating.toString());
    if (isNaN(rating) || rating < 1 || rating > 5) {
      newErrors.food_rating = "Rating must be between 1 and 5";
      isValid = false;
    }

    // Food Image URL validation (basic URL validation)
    if (formData.food_image && !isValidUrl(formData.food_image)) {
      newErrors.food_image = "Please enter a valid image URL";
      isValid = false;
    }

    // Restaurant Name validation
    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Convert data to match your API structure
    const mealData = {
      name: formData.food_name,
      rating: parseFloat(formData.food_rating.toString()),
      image: formData.food_image,
      restaurantName: formData.restaurant_name,
      restaurant: {
        name: formData.restaurant_name,
        logo: formData.restaurant_logo,
        isOpen: formData.restaurant_status === "Open Now"
      },
      open: formData.restaurant_status === "Open Now",
      price: "0.00" // You might want to add a price field to your form
    };

    onSave(mealData);
    
    // Reset form after successful validation (actual reset happens after API success)
    if (!isLoading) {
      resetForm();
    }
  };

  const resetForm = () => {
    setFormData({
      food_name: "",
      food_rating: 4.0,
      food_image: "",
      restaurant_name: "",
      restaurant_logo: "",
      restaurant_status: "Open Now"
    });
    setErrors({
      food_name: "",
      food_rating: "",
      food_image: "",
      restaurant_name: ""
    });
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleCancel}
        aria-hidden="true"
      />
      <div className="relative bg-white rounded-xl shadow-xl max-w-md w-full p-6 z-10">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Add a meal</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Food Name */}
          <div>
            <label htmlFor="food_name" className="block text-sm font-medium text-gray-700 mb-1">
              Food name
            </label>
            <input
              type="text"
              id="food_name"
              name="food_name"
              value={formData.food_name}
              onChange={(e) => handleChange('food_name', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.food_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter food name"
              disabled={isLoading}
            />
            {errors.food_name && (
              <p id="restaurant_name-error" className="text-red-500 text-sm mt-1">
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div>
            <label htmlFor="food_rating" className="block text-sm font-medium text-gray-700 mb-1">
              Food rating
            </label>
            <input
              type="number"
              id="food_rating"
              name="food_rating"
              value={formData.food_rating}
              onChange={(e) => handleChange('food_rating', parseFloat(e.target.value) || 0)}
              min="1"
              max="5"
              step="0.1"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.food_rating ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="4.0"
              disabled={isLoading}
            />
            {errors.food_rating && (
              <p id="restaurant_rating-error" className="text-red-500 text-sm mt-1">
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div>
            <label htmlFor="food_image" className="block text-sm font-medium text-gray-700 mb-1">
              Food image (link)
            </label>
            <input
              type="url"
              id="food_image"
              name="food_image"
              value={formData.food_image}
              onChange={(e) => handleChange('food_image', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.food_image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
              disabled={isLoading}
            />
            {errors.food_image && (
              <p id="restaurant_image-error" className="text-red-500 text-sm mt-1">
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div>
            <label htmlFor="restaurant_name" className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant name
            </label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={(e) => handleChange('restaurant_name', e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                errors.restaurant_name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter restaurant name"
              disabled={isLoading}
            />
            {errors.restaurant_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div>
            <label htmlFor="restaurant_logo" className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant logo (link)
            </label>
            <input
              type="url"
              id="restaurant_logo"
              name="restaurant_logo"
              value={formData.restaurant_logo}
              onChange={(e) => handleChange('restaurant_logo', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="https://example.com/logo.jpg"
              disabled={isLoading}
            />
          </div>

          {/* Restaurant Status */}
          <div>
            <label htmlFor="restaurant_status" className="block text-sm font-medium text-gray-700 mb-1">
              Restaurant status (open/close)
            </label>
            <select
              id="restaurant_status"
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={(e) => handleChange('restaurant_status', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              disabled={isLoading}
            >
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Adding Food...
                </>
              ) : (
                "Add"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMealModal;