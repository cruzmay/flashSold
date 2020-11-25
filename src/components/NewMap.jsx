import React, { useState, useEffect, useRef} from 'react';
import { 
    GoogleMap,
    LoadScript,
    Marker, 
    DirectionsRenderer, 
    DirectionsService} from '@react-google-maps/api'
import mapStyles from '../assets/styles/mapStyles'
import '../assets/styles/Header.scss'
import Logo from '../components/Logo'




const NewMap = () => {


    const [directions, setDirections] = useState();
    const [queryOrigin, setQueryOrigin] = useState(""); 
    console.log('Origin:', queryOrigin)
    const [queryDestination, setQueryDestination] = useState("");
    console.log('Destination:',queryDestination)
    const count = useRef(0);

    const mapContainerStyle = {
        height: '100vh',
        width: '100%',
    }
    const origin = {
        lat: 20.759840,
        lng: -103.387489
    };
    const destination = {
        lat: 20.548180,
        lng: -103.313591
    }

    const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
    }
    
     useEffect(() => {
    count.current = 0;
  }, [origin.lat, origin.lng, destination.lat, destination.lng]);

     const directionsCallback = (result, status) => {
    // if (!isLocationsEqual(waypoints.current, { origin, destination })) {
    //   waypoints.current = { origin, destination };
    //   count.current = 0;
    // }
    if (status === "OK" && count.current === 0) {
      count.current += 1;
      setDirections(result);
    }
  };



    return (
        <>
        <header className="map__header">
        <div className="map__header__promo">
            <h3>VENDE LO QUE QUIERAS NOSOTROS LO LLEVAMOS - 
                 <span> TU MEDIO ECÓNOMICO DE ENVIOS LOCALES</span>
            </h3>
        </div>
        <nav className="map__header__nav">
            <figure>
                <Logo/>
            </figure>
            <form action="post">
                <input 
                    type="search" 
                    placeholder="ENVIA DE:"
                    value={queryOrigin}
                    onChange={(e) => {
                    setQueryOrigin(e.target.value);
                    }}
                />
                <input 
                    type="search" 
                    placeholder="A:"
                    value={queryDestination}
                    onChange={(e) => {
                    setQueryDestination(e.target.value);
                }}
                
                />
                
            </form>    
        </nav>
    </header>

        <LoadScript googleMapsApiKey='AIzaSyAzhghT0R8MfIl7CsOCBtDgOWn_BJvJDPQ'>
            <GoogleMap
                mapContainerStyle = {mapContainerStyle}
                zoom={12}
                center={origin} 
                options = {options}
                >
                <DirectionsService
                    options = {{
                        origin: origin,
                        destination: destination,
                        travelMode: 'DRIVING'
                    }}
                    callback = {directionsCallback }
                />
                <DirectionsRenderer
                    directions = {directions}
                />
                {/* <Marker position={origin} /> */}
            </GoogleMap>
        </LoadScript>
        </>
    )
}

export default NewMap;