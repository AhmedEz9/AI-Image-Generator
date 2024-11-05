import { ErrorResponse } from '../types/MessageTypes';

const fetchData = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    console.log('Fetching data from URL:', url);
    console.log('Request options:', options);

    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
      const errorJson = json as unknown as ErrorResponse;
      console.log('Response error:', errorJson);
      throw new Error(errorJson.message || `Error ${response.status} occurred`);
    }

    return json;
  } catch (error) {
    console.error('Fetch error:', error);
    throw new Error('Fetch failed');
  }
};

export default fetchData;
