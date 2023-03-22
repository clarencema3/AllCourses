import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCourses } from '../../store/courses'

const ShowAllCourses = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses)
    
    useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])
    
    if (!courses) {
        return <div>Loading...</div>
    }
    const coursesArr = Object.values(courses)
    
    return (
        <div>test</div>
    )
}

export default ShowAllCourses