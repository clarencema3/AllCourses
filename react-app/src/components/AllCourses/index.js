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
                <div className='welcome-user hidden'>
                    <h1>Today's the day, {user.first_name}</h1>
                </div>
            )
        } else {
            return (
                <div className='welcome-user hidden'>
                    <h1>Find your outdoors</h1>
                </div>
            )
        }
    }
    
    return (
        <div className='home-container'>
            <div className='home-img-div'>
                <img src='https://i.imgur.com/CvE3Xl9.jpg' alt='golf course'/>
                {userLoggedIn()}
            </div>
            <div className='course-container white-space'>
                {coursesArr?.map(course => (
                    <NavLink to={`/courses/${course.id}`} className='courseCard' key={course.id}>
                        <img src={course.photo} alt='course' onError={e => { e.currentTarget.src = "https://i.imgur.com/A02fsZ2.png" }}/>
                        <p className='course-p'>{course.name}</p>
                        <strong className='course-p-2'>{course.city}, {course.state}</strong>
                    </NavLink>
                    
                ))}
            </div>
            <footer>
                <h2>Developer Links</h2>
                <div>
                    <span className="creator-names">
                        <a href="https://github.com/clarencema3" target="_blank" rel="noopener noreferrer" ><i class="fab fa-github dev-links" /></a>
                    </span>
                    <span className="creator-names">
                        <a href="https://www.linkedin.com/in/clarence-ma-93bb45258/" target="_blank" rel="noopener noreferrer" ><i class="fab fa-linkedin dev-links" /></a>
                    </span>
                </div>
                
            </footer>
        </div>
    )
}

export default ShowAllCourses