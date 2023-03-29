import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCompleted } from "../../store/completed";
import { useHistory } from "react-router-dom";
import './CompletedCourse.css'
import OpenModalButton from '../OpenModalButton';
import DeleteCompletedCourse from "../DeleteCompletedModal";

const ShowCompleted = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const user = useSelector(state => state.session.user)
    const completed = useSelector(state => state.completed.completed)
    
    useEffect(() => {
        dispatch(fetchCompleted())
    }, [dispatch])

    if (!user) {
        history.push('/')
    }

    if (!completed) return null
    const completedArr = Object.values(completed)
    console.log(completedArr)
    return (
        <div className="completed-course-div">
            <h2>Your completed courses</h2>
            {completedArr.map(course => (
                <div className="completed-course-container">
                    <div className="course-info">
                        <h3>{course.course.name}</h3>
                        <p>Location: {course.course.address}, {course.course.city}, {course.course.state}</p>
                    </div>
                    <div className="player-info-div">
                        <p>Feedback: {course.feedback}</p>
                        <p>Score: {course.score}</p>  
                        <OpenModalButton 
                        buttonText='Delete'
                        modalClass='delete-completed-btn'
                        modalComponent={
                            <DeleteCompletedCourse completedCourse={course}/>
                        }
                        />
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ShowCompleted