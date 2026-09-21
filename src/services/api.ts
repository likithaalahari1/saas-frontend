/**
 * Socially API Client Service
 * Base Production API URL: https://andhrayatri.in/api
 */

export const BASE_API_URL = 'https://andhrayatri.in/api';
export const LOCAL_API_URL = 'http://127.0.0.1:8000/api';

export async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${BASE_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    // Fallback to local API server if production is offline locally
    const fallbackUrl = `${LOCAL_API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
    const res = await fetch(fallbackUrl, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    return await res.json();
  }
}
