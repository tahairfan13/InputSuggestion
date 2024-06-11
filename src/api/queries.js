import { useQuery } from 'react-query';

const fetchSuggestions = async (query) => {
  const response = await fetch(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?search=${query}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const useSuggestions = (query) => {
  return useQuery(
    ['suggestions', query],
    () => fetchSuggestions(query),
    {
      enabled: !!query, // only run this query if query is not empty
      retry: false, // disable retries if the request fails
      onError: (error) => {
        console.error('Error fetching suggestions:', error);
      },
    }
  );
};
