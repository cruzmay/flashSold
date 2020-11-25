import React from 'react' 
const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");
import mapStyles from '../assets/styles/mapStyles';



const Map = compose(
  withProps({
    googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyAzhghT0R8MfIl7CsOCBtDgOWn_BJvJDPQ&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100vh' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount(setOrigin, setDestination) {
      
      const origin = setOrigin || 'zapopan+jal+ON';
      const destination = setDestination || 'Mexico+ON';


      const DirectionsService = new google.maps.DirectionsService();

      DirectionsService.route({
        origin: origin ,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={12}
    defaultCenter={origin}
    defaultOptions={
        { 
            styles: mapStyles,
            disableDefaultUI: true,
            zoomControl: true,
        }
    }
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
);

export default Map;