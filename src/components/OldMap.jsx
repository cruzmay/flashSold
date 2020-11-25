import React from 'react';
import '../assets/styles/App.scss';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
    DirectionsRenderer,
    DirectionsService,
} from '@react-google-maps/api';
// import {formatRelative} from 'date-fns';
// import usePlacesAutocomplete, {
//     getGeocode,
//     getLatLng,
// } from 'use-places-autocomplete';
import mapStyles from '../assets/styles/mapStyles'

const libraries = ["places"]
const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
}
const center = {
    lat: 20.760361,
    lng: -103.386984,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
}


const OldMap = () => {

    const [DirectionsResult, DirectionsStatus] = React.useState([])

    const origin = 'cto+parques+del+centinela+790+zapopan+jal+ON';
    const destination = 'Aeropuerto+guadalajara+jalisco+ON';
    
    const DirectionServiceDir = {
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
    };

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: 'AIzaSyAzhghT0R8MfIl7CsOCBtDgOWn_BJvJDPQ',
        libraries, 
    });

    if (loadError) return 'Error loading maps';
    if (!isLoaded) return 'Loading Maps'


    return <div>
        <GoogleMap 
        mapContainerStyle={mapContainerStyle}
        zoom={18}
        center = {center}
        options = {options}
        >
            <DirectionsService
                options = {DirectionServiceDir}
                />
            <DirectionsRenderer
                options = {{
                    directions: DirectionsService
                }}
            />
        </GoogleMap>
    </div>
};

export default OldMap;