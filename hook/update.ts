'use client';

import { useState } from "react";

interface UseUpdateResult<T> {
  update: (id: string | number, data: Partial<T>) => Promise<void>;
  loading: boolean;
  error: string | null;
  success: boolean;
  reset: () => void;
}

const useUpdate = <T = any>(baseUrl: string): UseUpdateResult<T> => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const update = async (id: string | number, data: Partial<T>) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: 'PUT', // or 'PATCH' for partial updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return { update, loading, error, success, reset };
};

export default useUpdate;