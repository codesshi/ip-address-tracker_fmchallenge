import {useEffect} from 'react';
import L from 'leaflet';

const Map = (props) => {
    const {lat, lng} = props.coord;

    console.log('rendered');

    useEffect(() => {
        console.log('useEffect');
        const map = L.map('map', {zoomControl: false}).setView([lat, lng], 16);
        const customIcon = L.icon(
            {
                iconUrl: "icon-location.svg",
                iconAnchor: [23, 56],
            });

        L.marker([lat, lng], {icon: customIcon}).addTo(map);
        L.tileLayer("https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=v9ZdPTmc692sQ8sJaa1F").addTo(map);

        return () => {map.remove()};
    }, [lat, lng]);

    return (
        <div id="map" style={{height: "100%"}}></div>
    );
}

export default Map;