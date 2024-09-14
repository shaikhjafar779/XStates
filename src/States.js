import React, { useEffect, useState } from 'react'
import axios from 'axios';

const States = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      axios.get('https://crio-location-selector.onrender.com/countries')
        .then(response => {
          console.log('Countries fetched:', response.data); // Log response
          setCountries(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching countries:', error); // Log error
          setError(error);
          setLoading(false);
        });
    }, []);
  
    const handleCountryChange = (e) => {
      const country = e.target.value;
      setSelectedCountry(country);
      setSelectedState('');
      setSelectedCity('');
      if (country) {
        axios.get(`https://crio-location-selector.onrender.com/country=${country}/states`)
          .then(response => {
            console.log('States fetched:', response.data); // Log response
            setStates(response.data);
          })
          .catch(error => {
            console.error('Error fetching states:', error); // Log error
            setError(error);
          });
      } else {
        setStates([]);
        setCities([]);
      }
    };
  
    const handleStateChange = (e) => {
      const state = e.target.value;
      setSelectedState(state);
      setSelectedCity('');
      if (state) {
        axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${state}/cities`)
          .then(response => {
            console.log('Cities fetched:', response.data); // Log response
            setCities(response.data);
          })
          .catch(error => {
            console.error('Error fetching cities:', error); // Log error
            setError(error);
          });
      } else {
        setCities([]);
      }
    };
  
    const handleCityChange = (e) => {
      setSelectedCity(e.target.value);
    };
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className='selectors'>
        <h1>Select Location</h1>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select Country</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <select
            value={selectedState}
            onChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <select
            value={selectedCity}
            onChange={handleCityChange}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        {selectedCountry && selectedState && selectedCity && (
          <div style={{display: 'flex',alignItems: 'center',gap: '20px', justifyContent: "center"}}>You selected <h4>{selectedCity}</h4>, <h3>{selectedState}</h3>, {selectedCountry}</div>
        )}
      </div>
    );
  };

export default States
