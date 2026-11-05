const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mednexa-intelligent-digital-healthcare.onrender.com/api';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Ensure leading slash so it appends cleanly to API_BASE_URL
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${formattedEndpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`Endpoint not found or server returned HTML (Check backend route for ${endpoint})`);
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};