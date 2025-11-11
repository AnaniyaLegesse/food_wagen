'use client';

import { useState, useMemo } from "react";

interface UseFilterResult<T> {
  filteredData: T[];
  filters: Record<string, any>;
  setFilter: (key: string, value: any) => void;
  clearFilters: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const useFilter = <T = any>(
  data: T[],
  searchableFields: (keyof T)[] = []
): UseFilterResult<T> => {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  const setFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const filteredData = useMemo(() => {
    let result = data;

    // Apply search
    if (searchTerm && searchableFields.length > 0) {
      result = result.filter(item =>
        searchableFields.some(field =>
          String(item[field]).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        result = result.filter(item => 
          item[key as keyof T] === value
        );
      }
    });

    return result;
  }, [data, filters, searchTerm, searchableFields]);

  return {
    filteredData,
    filters,
    setFilter,
    clearFilters,
    searchTerm,
    setSearchTerm,
  };
};

export default useFilter;