import './App.css';
import SearchBar from '../SearchBar';
import IpInfoCollapsible from '../IpInfoCollapsible';
import Map from '../Map';
import {FetchingSnackbar, ErrorSnackbar} from '../Snackbar';
import {useState, useEffect, useRef} from 'react';
import {isIPv4, isIPv6} from '../../utils/IPValidation';
import isDomain from '../../utils/DomainValidation';

// set fixed height to avoid viewport resize when displaying virtual keyboard
function useVirtualKeyboardFix() {
  const [height, setHeight] = useState("100%");

  useEffect(() => {
    const dimesions = document.body.getBoundingClientRect();
    setHeight(dimesions.height + "px");
  }, []);

  return height;
}

function useIpify() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const lastQueryRef = useRef({stale: false});

  useEffect(() => {
    const endpoint = process.env.REACT_APP_IPINFO_ENDPOINT;
    const key = process.env.REACT_APP_IPINFO_KEY;
    const currentQuery = {stale: false};
    lastQueryRef.current.stale = true;
    lastQueryRef.current = currentQuery;

    let search;

    if (query === "")
      search = "ipAddress=";
    if (isIPv4(query) || isIPv6(query))
      search = `ipAddress=${query}`;
    if (isDomain(query))
      search = `domain=${query}`;
    if (!search) {
      setIsError(true);
      setErrorType("Invalid Input");
      return;
    }

    setIsFetching(true);
    setIsError(false);

    fetch(`${endpoint}?apiKey=${key}&${search}`)
      .then(response => {
        if (!response.ok) {
          throw response.statusText;
        }
        
        return response.json();
      })
      .then(data => {
        if (currentQuery.stale) {
          return;
        }
        
        setIsFetching(false);
        setResult(
          {
            ip: data.ip,
            location: data.location.city,
            timezone: `UTC ${data.location.timezone}`,
            isp: data.isp,
            coord: {lat: data.location.lat, lng: data.location.lng}
          }
        );
      })
      .catch(err => {
        if (currentQuery.stale)
          return;
        
        const errorMessage = err.message === "Failed to fetch" ? "Connection Unavailable" : "Data Not Found";
        setIsError(true);
        setErrorType(errorMessage);
        setIsFetching(false);
        setResult();
      });
  }, [query]);

  return [{result, isFetching, isError, errorType}, setQuery];
}

function App() {
  const height = useVirtualKeyboardFix();
  const [{result, isFetching, isError, errorType}, search] = useIpify();

  const handleSearch = (str) => {
    if (str === "")
      return;

    search(str);
  }

  return (
    <div className="App" style={{height: height}}>
      <header>
        <h1>IP Address Tracker</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="result-container">
          {result && <IpInfoCollapsible info={result}/>}
        </div>
      </header>
      <div className="map-container">
        <Map coord={result && result.coord}/>
      </div>
      {<ErrorSnackbar show={isError}>{errorType}</ErrorSnackbar>}
      {<FetchingSnackbar show={isFetching} />}
    </div>
  );
}

export default App;
