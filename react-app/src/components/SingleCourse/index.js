import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearState, fetchSingleCourse } from '../../store/courses';
import ReadReviews from '../ReadReviews';
import './SingleCourse.css'
import Map from '../Map';

const SingleCourse = () => {
    const dispatch = useDispatch()
    const { courseId } = useParams()
    const course = useSelector(state => state.courses.course)
    
    useEffect(() => {
        dispatch(fetchSingleCourse(courseId))
        return () => dispatch(clearState())
    }, [dispatch, courseId])

    if (!course || !course.reviews) return <h1>loading...</h1>

    let avgStars = 0
    const avgRating = () => {
        course.reviews.forEach(review => {
            avgStars += review.rating
        })
        return Number(avgStars / course.reviews.length).toFixed(1)
    }

    //put the course into an array for the map component because favorites+completed will use multiple courses
    const courseMapArr = []
    courseMapArr.push(course)

    return (
        <div className='single-page-div'>
            <div className='single-course-info'>
                <div className='single-course-images'>
                    <img src={course?.photo} alt='golf course' onError={e => { e.currentTarget.src = "https://i.imgur.com/z8kAmH8.png" }}/>
                    
                    <div className='img-overlay'>
                        <p className='course-info-p'>{course.name}</p>
                        {course.reviews.length ? 
                        <p className='course-info-p'><i className="fas fa-star" /> · {avgRating()}</p>
                        : <p className='course-info-p'>No reviews available</p>
                        }
                        <p className='course-info-p'>{course.city}, {course.state}, {course.country}</p>
                    </div>
                </div>
                <div className='single-course-details'>
                    <div className='price-div'>
                        <p>Price:</p>
                        <strong>${Number(course.price).toFixed(2)}</strong>
                    </div>
                    <div className='type-div'>
                        <p>Type:</p>
                        <strong>{course.type} Holes</strong>
                    </div>
                    <div className='url-div'>
                        <p>Course Website:</p>
                        <a href={course.course_url} target="_blank" rel="noopener noreferrer">{course.course_url}</a>
                    </div>
                    <Map 
                    courseArr={courseMapArr}
                    />
                </div>
                <br/>
                <div className='single-course-desc'>
                    <strong>Description</strong>
                    <p>{course.description}</p>
                </div>
                <div className='reviews-div'>
                    <ReadReviews course={course}/>
                </div>
                
            </div>
        </div>
    )

}

export default SingleCourse