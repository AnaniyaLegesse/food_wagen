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

interface DeleteMealModalProps {
  meal: Meal;
  onConfirm: () => void;
  onClose: () => void;
}

const DeleteMealModal = ({ meal, onConfirm, onClose }: DeleteMealModalProps) => {
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
      <div className="relative bg-white rounded-xl shadow-xl max-w-sm w-full p-6 z-10">
        <h3 className="text-lg font-semibold mb-3">Delete Meal</h3>
        <p className="text-sm text-gray-600 mb-5">
          Are you sure you want to delete <strong>{meal.name}</strong>?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-400 text-white font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMealModal;