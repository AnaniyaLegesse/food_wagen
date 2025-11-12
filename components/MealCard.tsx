import { useState, useEffect, useRef } from "react";
import { Star, MoreVertical } from "lucide-react";
import EditMealModal from "./EditMealModal";
import DeleteMealModal from "./DeleteMealModal";

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

interface MealCardProps {
  meal: Meal;
  onEdit?: (updated: Partial<Meal> & { id: string }) => void;
  onDelete?: (id: string) => void;
}

const MealCard = ({ meal, onEdit, onDelete }: MealCardProps) => {
  const imageUrl = meal.image || "https://via.placeholder.com/300x200?text=Food+Image";
  const isOpen = meal.open || meal.restaurant?.isOpen;

  const [menuOpen, setMenuOpen] = useState(false);
  const [modal, setModal] = useState<null | "edit" | "delete">(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  // Close modal with Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setModal(null);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSaveEdit = (updatedData: Partial<Meal> & { id: string }) => {
    onEdit?.(updatedData);
    setModal(null);
  };

  const handleConfirmDelete = () => {
    onDelete?.(meal.id);
    setModal(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
        {/* Image and Price Tag */}
        <div className="relative h-48">
          <img src={imageUrl} alt={meal.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
            ${meal.price}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{meal.name}</h3>

            {/* Modal Toggle Button */}
            <div className="relative z-50" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((s) => !s)}
                className="text-gray-400 hover:text-gray-600 ml-2 p-1 rounded-md"
              >
                <MoreVertical size={20} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setModal("edit");
                    }}
                    className="w-full text-left text-sm px-4 py-2 hover:bg-gray-50 rounded-t-lg"
                  >
                    <span className="text-gray-600">Edit</span>
                  </button>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      setModal("delete");
                    }}
                    className="w-full text-left text-sm px-4 py-2 hover:bg-gray-50 rounded-b-lg"
                  >
                    <span className="text-red-500">Delete</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Restaurant Info & Status */}
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center">
              <div className="flex items-center text-sm text-gray-600">
                <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                <span>{meal.rating}</span>
              </div>
            </div>

            {/* Open/Closed Status */}
            <div
              className={`text-sm font-semibold px-2 py-0.5 rounded-full ${
                isOpen ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
              }`}
            >
              {isOpen ? "Open" : "Closed"}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {modal === "edit" && (
        <EditMealModal
          meal={meal}
          onSave={handleSaveEdit}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete Confirm Modal */}
      {modal === "delete" && (
        <DeleteMealModal
          meal={meal}
          onConfirm={handleConfirmDelete}
          onClose={() => setModal(null)}
        />
      )}
    </>
  );
};

export default MealCard;