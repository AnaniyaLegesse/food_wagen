'use client';

import { useState, useEffect, useCallback } from "react";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  create: (item: Omit<T, 'id'>) => Promise<T | null>;
  update: (id: string, item: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
  filter: (searchParams: Record<string, string>) => Promise<void>;
}

const useFetch = <T = any>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Base fetch function
  const fetchData = useCallback(async (fetchUrl?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(fetchUrl || url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setData(json);
      return json;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  // GET - Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // CREATE - Add new item
  const create = useCallback(async (item: Omit<T, 'id'>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newItem = await response.json();
      
      // Update local state by adding the new item
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return [...prevData, newItem] as T;
        }
        return newItem;
      });

      return newItem;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  // UPDATE - Update existing item
  const update = useCallback(async (id: string, item: Partial<T>): Promise<T | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedItem = await response.json();
      
      // Update local state
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.map((existingItem: any) => 
            existingItem.id === id ? { ...existingItem, ...updatedItem } : existingItem
          ) as T;
        }
        return updatedItem;
      });

      return updatedItem;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [url]);

  // DELETE - Remove item
  const remove = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update local state by removing the item
      setData(prevData => {
        if (Array.isArray(prevData)) {
          return prevData.filter((item: any) => item.id !== id) as T;
        }
        return null;
      });

      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  }, [url]);

  // FILTER - Filter items by search parameters
  const filter = useCallback(async (searchParams: Record<string, string>): Promise<void> => {
    const params = new URLSearchParams(searchParams).toString();
    const filterUrl = `${url}?${params}`;
    await fetchData(filterUrl);
  }, [fetchData, url]);

  // REFETCH - Refresh data
  const refetch = useCallback(async (): Promise<void> => {
    await fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    create,
    update,
    remove,
    refetch,
    filter,
  };
};

export default useFetch;