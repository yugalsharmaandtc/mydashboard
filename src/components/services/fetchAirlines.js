export const fetchAirlines = async () => {
    const response = await fetch('http://10.34.40.114:8000/airline');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  };
  