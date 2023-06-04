import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

const API_URL = 'http://localhost:7000/weatherDetails/';
const ICON_URL = 'http://openweathermap.org/img/wn/';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(API_URL + city);
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <div>
        <h1 className="text-center mb-4">Weather App</h1>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formCity">
            <Form.Label>Enter City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Get Weather
          </Button>
        </Form>
        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="mb-0">{weatherData.city}</h2>
            <p className="text-muted">{weatherData.description}</p>
            <div className="d-flex align-items-center justify-content-center">
              <img
                src={`${ICON_URL}${weatherData.icon}@2x.png`}
                alt={weatherData.description}
                className="weather-icon"
              />
              <h1 className="display-3 font-weight-bold">
                {weatherData.temperature}°C
              </h1>
            </div>
            <div className="weather-details">
              <p>
                <strong>Humidity:</strong> {weatherData.humidity}%
              </p>
              <p>
                <strong>Wind:</strong> {weatherData.windSpeed} km/h
              </p>
              <p>
                <strong>Sunrise:</strong>{' '}
                {new Date(weatherData.sunrise * 1000).toLocaleTimeString()}
              </p>
              <p>
                <strong>Sunset:</strong>{' '}
                {new Date(weatherData.sunset * 1000).toLocaleTimeString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default App;
