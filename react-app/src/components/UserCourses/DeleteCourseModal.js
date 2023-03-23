import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteCourse } from '../../store/courses';
import { useModal } from '../../context/Modal';


const DeleteCourseModal = ({ id }) => {
    const dispatch = useDispatch();
    const { closeModal } = useModal()

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(deleteCourse(+id))
        closeModal()
    }

    return (
        <div className='delete-course-div'>
            <h1>Remove Course</h1>
            <p>Are you sure you want to remove the course?</p>
            <button onClick={handleSubmit} className='delete-button'>Confirm</button>
        </div>
    )
}

export default DeleteCourseModal