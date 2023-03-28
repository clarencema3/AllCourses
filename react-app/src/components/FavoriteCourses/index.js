import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavorites } from '../../store/favorites'
import { NavLink, useHistory } from 'react-router-dom'
import './FavoriteCourses.css'
import Map from '../Map';

const ShowFavorites = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)
    const user = useSelector(state => state.session.user)

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

    if (!user) {
        history.push('/')
    }
    
    if (!favorites) return null
    const courses = favorites?.favorites
    if (!courses) return null
    const favoritesArr = Object.values(courses)
    //filter favorites by current user logged on
    const userFavorites = favoritesArr.filter(favorite => favorite.user_id === user.id)
    
    return (
        <div className='favorites-container'>
            {userFavorites.length ? 
                <div className='favorites-div'>
                    <section className='fav-course-section'>
                        <div className='course-container white-space'>
                        {userFavorites.map(course => (
                            <NavLink to={`/courses/${course.course.id}`} className='courseCard' key={course.course.id}>
                                <img src={course.course.photo} alt='course' onError={e => { e.currentTarget.src = "https://i.imgur.com/A02fsZ2.png" }}/>
                                <p className='course-p'>{course.course.name}</p>
                                <strong className='course-p-2'>{course.course.city}, {course.course.state}</strong>
                            </NavLink>
                        ))}
                        </div>
                    </section>
                    <div className='favorites-map'>
                        <Map courseArr={userFavorites}/>
                    </div>
                </div> :
                <div className='empty-favorites'>
                    <h1>Favorites list is empty</h1>
                    <h2>Add a course to your favorites today!</h2>
                    <div>
                        <img src='https://i.imgur.com/BH9H5J5.png'></img>
                    </div>
                </div>
            }
        </div>
    )
}


export default ShowFavorites