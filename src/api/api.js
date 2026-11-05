const getApiBaseUrl = () => {
  let url = import.meta.env.VITE_API_BASE_URL || 'https://mednexa-intelligent-digital-healthcare.onrender.com';
  // Remove trailing slash if present
  if (url.endsWith('/')) url = url.slice(0, -1);
  // Ensure it ends with /api cleanly
  if (!url.endsWith('/api')) url += '/api';
  return url;
};

const API_BASE_URL = getApiBaseUrl();

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Clean up endpoint to avoid duplicate /api or missing slashes
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  if (cleanEndpoint.startsWith('/api/')) {
    cleanEndpoint = cleanEndpoint.replace('/api', '');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${cleanEndpoint}`, {
      ...options,
      headers,
    });

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Server connection error (Invalid server response)');
    }

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};