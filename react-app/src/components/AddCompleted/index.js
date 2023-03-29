import React, { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addCompleted, fetchCompleted } from "../../store/completed";
import './AddCompleted.css'

const AddCompleted = ({ course_id, user_id }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const userCompletedCourses = useSelector(state => state.completed.completed)
    const [score, setScore] = useState('')
    const [feedback, setFeedback] = useState('')
    const [errors, setErrors] = useState([])

    
    useEffect(() => {
        dispatch(fetchCompleted())
    }, [dispatch])

    if (!userCompletedCourses) return null
    const userCompletedCoursesArr = Object.values(userCompletedCourses)
    const existInCompletedList = userCompletedCoursesArr.find(course => course.course_id === course_id)

    const submit = async (e) => {
        e.preventDefault()
        const completed = {
            'course_id': course_id,
            'user_id': user_id,
            'score': score,
            'feedback': feedback
        }
        const data = await dispatch(addCompleted(completed))
        if (data) {
            setErrors(data)
        } else {
            closeModal()
        }
    }

    return (
        <div>
            {existInCompletedList ? 
                <h2>This course is already in your completed list</h2> :
                <div>
                    <h2>Add this course to your completed list</h2>
                    <form className="completed-course-form">
                        <ul>
                        {errors && errors.map((error, idx) => (
                            <li key={idx}>{error}</li>
                        ))}
                        </ul>
                        <div className="completed-score">
                            <p>Score </p>
                            <input type='number' min={1} required value={score} onChange={(e) => setScore(e.target.value)}></input>
                        </div>
                        <div className="completed-feedback">
                            <p>Feedback</p>
                            <textarea placeholder='What did you think of the course?' cols='36' rows='10' required value={feedback} onChange={(e) => setFeedback(e.target.value)}></textarea>
                        </div>
                        <button onClick={submit} className="sign-form-button">Add</button>
                    </form>
                </div>
            }
        </div>
    )
}

export default AddCompleted