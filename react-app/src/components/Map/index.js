import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete'; 
import { useDispatch } from 'react-redux';
import { fetchSingleCourse, updateCourse } from '../../store/courses';

const libs = ["places"]

function Map({ course }) {
    const dispatch = useDispatch()
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries: libs
    })

    if (!isLoaded) {
        return 'Loading'
    }

    const existingCoords = {
        lat: course.latitude, lng: course.longitude      
    }

    //get coordinates from address if lat & lng are both 0(default values)
    const getCoordinates = () => {
        const parameter = {
            address: `${course.address}, ${course.city}, ${course.state}`
        }

        getGeocode(parameter).then((results) => {
            const { lat, lng } = getLatLng(results[0])
            course.latitude = lat
            course.longitude = lng
            dispatch(updateCourse(course))
            dispatch(fetchSingleCourse(course.id))
            const center = {
                lat: course.latitude, lng: course.longitude
            }
            return center
        })
    }
    
    
    return (
       <GoogleMap 
       center={course.latitude !== 0 && course.longitude !== 0 ? existingCoords : getCoordinates()} 
       zoom={12} 
       mapContainerStyle={{width: '100%', height: '100%'}}>
        <Marker
        position={course.latitude !== 0 && course.longitude !== 0 ? existingCoords : getCoordinates()}
        />
       </GoogleMap>
    )
}

export default Map