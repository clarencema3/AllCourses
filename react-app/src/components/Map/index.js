import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete'; 
import { useDispatch } from 'react-redux';
import { fetchSingleCourse, updateCourse } from '../../store/courses';



function Map({ courseArr }) {
    const dispatch = useDispatch()
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
       
    })

    if (!isLoaded) {
        return 'Loading'
    }
    console.log(courseArr)
    const oneCourseCoords = (course) => {
        const existingCoords = {
            lat: course.latitude, lng: course.longitude      
        }
        return existingCoords
        
    }

    //get coordinates from address if lat & lng are both 0(default values)
    const getSingleCoordinates = (course) => {
        
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
       center={courseArr.length === 1 ?
            courseArr[0].latitude !== 0 && courseArr[0].longitude !== 0 ? oneCourseCoords(courseArr[0]) : getSingleCoordinates(courseArr[0])
        : courseArr[0].course.latitude !== 0 && courseArr[0].course.longitude !== 0 ? oneCourseCoords(courseArr[0].course) : getSingleCoordinates(courseArr[0].course)
        } 
       zoom={courseArr.length === 1 ? 11 : 8} 
       mapContainerStyle={{width: '100%', height: '100%'}}>
        <div>
            {courseArr.length === 1 ? 
            courseArr.map(course => (
                <Marker
                key={course.id}
                position={course.latitude !== 0 && course.longitude !== 0 ? oneCourseCoords(course) : getSingleCoordinates(course)}
                />
            )) :
            courseArr.map(course => (
                <Marker
                key={course.id}
                position={course.course.latitude !== 0 && course.course.longitude !== 0 ? oneCourseCoords(course.course) : getSingleCoordinates(course.course)}
                />
            ))
        }
        </div>
       </GoogleMap>
    
    )
}

export default Map