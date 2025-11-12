import { Star, MoreVertical } from 'lucide-react';

interface MealCardProps {
  meal: {
    id: number;
    name: string;
    price: number;
    image?: string;
  };
  rating: string;
  isClosed: boolean;
  reviews: number;
}

const MealCard = ({ meal, rating, isClosed, reviews }: MealCardProps) => {
  const imageUrl = meal.image || 'https://via.placeholder.com/300x200?text=Food+Image';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden cursor-pointer">
      {/* Image and Price Tag */}
      <div className="relative h-48">
        <img 
          src={imageUrl} 
          alt={meal.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
          ${meal.price}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
            {meal.name}
          </h3>
          <button className="text-gray-400 hover:text-gray-600 ml-2">
            <MoreVertical size={20} />
          </button>
        </div>

        {/* Restaurant Info & Status */}
        <div className="flex justify-between items-center mt-3">
          <div className="flex items-center">
            <div className="flex items-center text-sm text-gray-600">
              <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span>{rating}</span>
            </div>
          </div>

          {/* Open/Closed Status */}
          <div className={`text-sm font-semibold px-2 py-0.5 rounded-full ${isClosed ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {isClosed ? 'Closed' : 'Open'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;