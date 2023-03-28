import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavorites } from '../../store/favorites'
import { NavLink } from 'react-router-dom'
import './FavoriteCourses.css'


const ShowFavorites = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

    if (!favorites) return null
    const courses = favorites?.favorites
    if (!courses) return null
    const favoritesArr = Object.values(courses)
    return (
        <div className='favorites-div'>
            <section className='fav-course-section'>
                <div className='course-container white-space'>
                {favoritesArr.map(course => (
                        <NavLink to={`/courses/${course.course.id}`} className='courseCard' key={course.course.id}>
                            <img src={course.course.photo} alt='course' onError={e => { e.currentTarget.src = "https://i.imgur.com/A02fsZ2.png" }}/>
                            <p className='course-p'>{course.course.name}</p>
                            <strong className='course-p-2'>{course.course.city}, {course.course.state}</strong>
                        </NavLink>
                ))}
                </div>
            </section>
            <div className='favorites-map'>

            </div>
        </div>
    )
}


export default ShowFavorites