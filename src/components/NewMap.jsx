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
import usePlacesAutoComplete, 
{getGeocode, 
getLatLng,
getDetails
} from 'use-places-autocomplete';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption
} from '@reach/combobox'
import "@reach/combobox/styles.css";



const NewMap = () => {

    const [directions, setDirections] = useState();
    const [queryOrigin, setQueryOrigin] = useState(""); 
    console.log('Origin:', queryOrigin)
    const [queryDestination, setQueryDestination] = useState("");
    console.log('Destination:',queryDestination)
    const count = useRef(0);

    const libraries = [
        'places',
        'geometry',
    ]
        
    const mapContainerStyle = {
        height: '100vh',
        width: '100%',
    }
    
    
    
    // console.log('vienes de input', originMark)
    const origin = queryOrigin || {lat: 20.548180, lng: -103.313591  } ;
    const destination = queryDestination || {lat: 20.548180, lng: -103.313591 };

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

//   const PanToOrigin = React.useCallback(({ lat, lng }) => {
//     mapRef.current.PanToOrigin({lat, lng})
//     map
//   })

    return (
        <>
        <LoadScript googleMapsApiKey='AIzaSyAzhghT0R8MfIl7CsOCBtDgOWn_BJvJDPQ' libraries={libraries}>

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
                    {/* <Search/> */}
                     <input 
                    type="search" 
                    placeholder="ENVIA DE:"
                    value={queryOrigin}
                    onInput={ (e) => {
                    setQueryOrigin(e.target.value);
                    }}
                />
                <input 
                    type="search" 
                    placeholder="A:"
                    value={queryDestination}
                    onInput={ (e) => {
                    setQueryDestination(e.target.value);
                }} 
                 />
                </form>   
            </nav>
        </header>
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
                    callback = {directionsCallback}
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

// const Search = () => {
//     const {ready, 
//         value, 
//         suggestions: 
//         {status, data}, 
//         setValue, 
//         clearSuggestions} = usePlacesAutoComplete({
//         requestOptions: {
//            location: {lat: () => 20.759840, lng: () => -103.387489 },
//            radius: 200 * 1000,
//         }
//     });
//     return <Combobox onSelect={ async (address)=>{
//         try {
//             const results = await getGeocode({address});
//             const { lat, lng } = await getLatLng(results[0])
//             const originMark = {lat, lng}
//             console.log(originMark)
//         } catch(error) {
//             console.log('error')
//         }
//     }}>
//         <ComboboxInput 
//             value={value} onChange={(e)=>{
//                 setValue(e.target.value)
//             }}
//             disabled={!ready}
//             placeholder = "DE:"
//         />
//         <ComboboxPopover>
//             {status === "OK" && data.map(({id, description})=> 
//                 <ComboboxOption key={id} value={description} />
//             )}
//         </ComboboxPopover>
//     </Combobox>
// }

export default NewMap;