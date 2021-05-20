import './App.css';
import SearchBar from '../SearchBar';
import IpInfo from '../IpInfo';
import Map from '../Map';
import {useState, useEffect} from 'react';

function App() {
  const fakeEndpoint = "info.json";
  const key = "1234";
  const [info, setInfo] = useState(
    {
      ip: "192.212.174.101",
      location: "Brooklyn, NY 10001",
      timezone: "UTC -05:00",
      isp: "SpaceX Starlink",
      coord: {lat: 0, lng: 0}
    }
  );

  // set fixed height to avoid viewport resize when displaying virtual keyboard
  const [height, setHeight] = useState("100%");

  useEffect(() => {
    const dimesions = document.body.getBoundingClientRect();
    setHeight(dimesions.height + "px");
  }, []);

  const handleSearch = (str) => {
    fetch(`${fakeEndpoint}?apiKey=${key}&ipAddress=${str}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setInfo(
          {
            ip: data.ip,
            location: data.location.city,
            timezone: `UTC ${data.location.timezone}`,
            isp: data.isp,
            coord: {lat: data.location.lat, lng: data.location.lng}
          }
        );
      });
  }

  return (
    <div className="App" style={{height: height}}>
      <header>
        <h1>IP Address Tracker</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="resultContainer">
          <IpInfo info={info}/>
        </div>
      </header>
      <div className="map-container">
        <Map coord={info.coord}/>
      </div>
    </div>
  );
}

export default App;
