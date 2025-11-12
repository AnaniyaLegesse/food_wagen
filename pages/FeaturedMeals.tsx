'use client'

import MealCard from "@/components/meal_card";
import useFetch from "@/hook/useFetch";


// Helper function to generate random ratings and status
const getRandomData = (id: number) => {
  const rating = ((id % 5) + 3) + Math.random().toFixed(1);
  const isClosed = id % 3 === 0;
  const reviews = Math.floor(Math.random() * 200) + 1;
  return { rating, isClosed, reviews };
};

const FeaturedMeals = () => {
  const { data, loading, error } = useFetch('https://6852821e0594059b23cdd834.mockapi.io/Food');

  if (loading) return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Meals</h2>
      <div className="text-center text-gray-500">Loading meals...</div>
    </section>
  );

  if (error) return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Meals</h2>
      <div className="text-center text-red-500">Error loading data: {error}</div>
    </section>
  );

  return (
    <section className="p-12">
      <h2 className="text-3xl font-bold text-center text-black mb-10">Featured Meals</h2>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Meal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data && data.map((meal: any) => {
            const { rating, isClosed, reviews } = getRandomData(meal.id);
            
            return (
              <MealCard 
                key={meal.id}
                meal={meal}
                rating={rating}
                isClosed={isClosed}
                reviews={reviews}
              />
            );
          })}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition duration-300 flex items-center justify-center mx-auto">
            Load more <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMeals;