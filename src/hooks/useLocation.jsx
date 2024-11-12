import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [position, setPosition] = useState(null); // State to store user's position
  const [location, setLocation] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get user's location
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          const { latitude, longitude } = location.coords;
          setPosition([latitude, longitude]); // Update position state with coordinates
        },
        (error) => {
          setIsLoading(false);
          setError(error);
        },
      );
    }
  }, []);

  useEffect(() => {
    if (position) {
      fetch('/api/places/name', {
        method: 'POST',
        body: JSON.stringify({
          data: {
            latitude: position[0],
            longitude: position[1],
          },
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          setLocation(data.location);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    }
  }, [position]);
  return { location, position, isLoading, error };
};
