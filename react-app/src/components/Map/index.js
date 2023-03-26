import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'


function Map({ latitude, longitude}) {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    })

    const center = { lat: latitude, lng: longitude }
    console.log(center)
    if (!isLoaded) {
        return 'Loading'
    }

    return (
       <GoogleMap 
       center={center} 
       zoom={12} 
       mapContainerStyle={{width: '100%', height: '100%'}}>
        <Marker
        position={center}
        />
       </GoogleMap>
    )
}

export default Map