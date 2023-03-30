import React, { useState } from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { editCompletedCourse, fetchCompleted } from '../../store/completed'


const EditCompletedCourse = ({ completedCourse }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [feedback, setFeedback] = useState(completedCourse.feedback)
    const [submitted, setSubmitted] = useState(false)
    const [errors, setErrors] = useState([])

    
    const submit = async (e) => {
        e.preventDefault()
        setSubmitted(true)
        completedCourse.feedback = feedback

        const data = await dispatch(editCompletedCourse(completedCourse))
        if (data) {
            setErrors(data)
        } else {
            dispatch(fetchCompleted())
            closeModal()
        }

    }

    return (
        <div>
            <h1>Edit your feedback</h1>
            <form onSubmit={submit}>
                <ul>
                    {submitted && errors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <textarea 
                rows='10' 
                cols='40' 
                value={feedback} 
                onChange={e => setFeedback(e.target.value)}>
                </textarea>
                <div>
                    <button className='modal-btn'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default EditCompletedCourse