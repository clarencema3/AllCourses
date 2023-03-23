import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchCourses } from '../../store/courses'

import './AllCourses.css'

const ShowAllCourses = () => {
    const dispatch = useDispatch();
    const courses = useSelector(state => state.courses.courses)
    const user = useSelector(state => state.session.user)
    
    useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])
    
    if (!courses) {
        return <div>Loading...</div>
    }
    const coursesArr = Object.values(courses)
    
    const userLoggedIn = () => {
        if (user) {
            return (
                <div className='welcome-user'>
                    <h1>Today's the day, {user.first_name}</h1>
                </div>
            )
        } else {
            return (
                <div className='welcome-user'>
                    <h1>Find your outdoors</h1>
                </div>
            )
        }
    }
    

    return (
        <div className='home-container'>
            <div className='home-img-div'>
                <img src='https://i.imgur.com/CvE3Xl9.jpg'></img>
                {userLoggedIn()}
            </div>
            <div className='course-container white-space'>
                {coursesArr?.map(course => (
                    <NavLink to={`/courses/${course.id}`} className='courseCard' key={course.id}>
                        <img src={course.photo} alt='course' />
                        <p className='course-p'>{course.name}</p>
                        <strong className='course-p-2'>{course.city}, {course.state}</strong>
                    </NavLink>
                    
                ))}
            </div>
        </div>
    )
}

export default ShowAllCourses