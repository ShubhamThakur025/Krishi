import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Weather from "./Weatherdata";

export default function WeatherForecast() {
  const [lat, setLat] = useState();
  const [long, setLong] = useState();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setLat(position.coords.latitude);
            setLong(position.coords.longitude);
          },
          (error) => {
            throw new Error(`Geolocation error: ${error.message}`);
          }
        );

        // Wait for lat and long to be set
        await new Promise((resolve) => {
          const interval = setInterval(() => {
            if (lat && long) {
              clearInterval(interval);
              resolve();
            }
          }, 100);
        });

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather/?lat=${lat}&lon=${long}&units=metric&appid=ddf2b35b2fe3fb204430d66660ccda38`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, [lat, long]);

  return (
    <div className="flex flex-col justify-center w-screen">
      {typeof data.main !== "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
