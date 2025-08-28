import { useCallback, useEffect, useState } from 'react';

interface Quote {
  quote: string;
  author: string;
}

interface UseQuoteOfTheDayReturn {
  quote: Quote | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useQuoteOfTheDay = (): UseQuoteOfTheDayReturn => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://quotes-api-self.vercel.app/quote');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      setQuote({
        quote: data.quote,
        author: data.author,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch quote');
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchQuote();
  }, [fetchQuote]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return {
    quote,
    loading,
    error,
    refetch,
  };
};
