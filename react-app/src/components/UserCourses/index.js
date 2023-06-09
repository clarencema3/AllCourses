import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, NavLink } from 'react-router-dom'
import { fetchCourses } from '../../store/courses'
import './UserCourses.css'
import OpenModalButton from "../OpenModalButton";
import DeleteCourseModal from './DeleteCourseModal';
import EditCourseModal from './EditCourseModal';
import EditPhoto from './EditCoursePhoto';


const UserCourses = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const courses = useSelector(state => state.courses.courses)

    useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])

    if (!courses) return <div>Loading...</div>
    
    if (!user) {
        history.push('/')
    }
    
    const userId = user?.id;
    const coursesArr = Object.values(courses)
    const userCourses = coursesArr.filter(course => course?.user?.id === userId)

    return (
        <div>
            <div className='home-img-div'>
                <img src='https://i.imgur.com/Ntrd4Ct.jpg' alt='golf course'></img>
            </div>
            <div className='user-course-container'>
                {userCourses.length ? userCourses?.map(course => (
                    <div className='user-card-div' key={course.id}>
                        <NavLink to={`/courses/${course.id}`}>
                            <div className='user-course-card'>
                                <img src={course.photo} alt='course' onError={e => { e.currentTarget.src = "https://i.imgur.com/A02fsZ2.png" }}/>
                            </div>
                        </NavLink>
                        <OpenModalButton
                        modalClass='edit-delete-user-course edit-photo'
                        buttonText={<i className="fas fa-camera" />}
                        modalComponent={
                            <EditPhoto course={course} />
                        }
                        />
                        <div className='user-course-info' >
                            <div>
                                <p className='user-course-name'>{course.name}</p>
                            </div>
                            <div className='user-course-btns'>
                                <OpenModalButton
                                modalClass='edit-delete-user-course'
                                buttonText='edit'
                                modalComponent={
                                    <EditCourseModal course={course} />
                                }
                                />
                                <OpenModalButton 
                                modalClass='edit-delete-user-course'
                                buttonText='delete'
                                modalComponent={
                                    <DeleteCourseModal id={course.id} />
                                }
                                />
                            </div>
                        </div>
                    </div>
                )) :
                <div className='no-user-course-div'>
                    <h1>Add your first course!</h1>
                    <NavLink to="/courses/new" className='user-add-course'>Add Course</NavLink>
                </div>
                }
            </div>
        </div>
    )
}

export default UserCourses