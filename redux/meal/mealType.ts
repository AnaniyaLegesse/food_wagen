export interface Meal {
  id: string;
  name: string;
  price: string;
  image: string;
  rating: number; // Convert string to number for easier use
  open: boolean;
  restaurantName: string;
  restaurant?: {
    name: string;
    logo: string;
    isOpen: boolean;
  };
  createdAt?: string;
}

export interface MealState {
  meals: Meal[];
  filteredMeals: Meal[];
  searchTerm: string;
  loading: boolean;
  error: string | null;
}
