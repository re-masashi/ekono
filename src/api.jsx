export const api = async (endpoint, options) => {
  const response = await fetch(`http://localhost:8000${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('jwt_token') 
        ? `Bearer ${localStorage.getItem('jwt_token')}`
        : '',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'API request failed');
  }

  return response.json();
};