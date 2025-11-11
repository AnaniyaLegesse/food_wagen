'use client'

import usefetch from '@/hook/usefetch';

const FeaturedMeals = () => {
  const { data, loading, error } = usefetch('https://6852821e0594059b23cdd834.mockapi.io/Food');

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  console.log(data);

  return (
    <div>
      {data && data.map((meal: any) => (
          <div key={meal.id}>
            <h2>{meal.name}</h2>
            <p>Price: ${meal.price}</p>
          </div>
        ))
      }
    </div>
  )
}

export default FeaturedMeals