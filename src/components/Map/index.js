import {useEffect, useRef} from 'react';
import L from 'leaflet';

const useMap = (lat, lng, id = "map") => {
    const mapRef = useRef()

    useEffect(() => {
        if (!mapRef.current) {
            const map = L.map('map', {zoomControl: false});
            const customIcon = L.icon(
                {
                    iconUrl: "icon-location.svg",
                    iconAnchor: [23, 56],
                });
            const marker = L.marker([lat, lng], {icon: customIcon}).addTo(map);
            L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?{token}", {token: "key=v9ZdPTmc692sQ8sJaa1F"}).addTo(map);

            mapRef.current = {map, marker}
        }

        mapRef.current.map.setView([lat, lng], 16);
        mapRef.current.marker.setLatLng([lat, lng]);
    });

    useEffect(() => {
        return () => {
            mapRef.current.map.remove();
            mapRef.current = undefined;
        }
    }, []);
}

const Map = (props) => {
    const {lat, lng} = props.coord;

    useMap(lat, lng);

    return (
        <div id="map" style={{height: "100%"}}></div>
    );
}

export default Map;