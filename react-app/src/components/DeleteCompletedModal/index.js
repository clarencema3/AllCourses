import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteCompletedCourse } from '../../store/completed'



const DeleteCompletedCourse = ({ completedCourse }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    

    const submit = (e) => {
        e.preventDefault()
        dispatch(deleteCompletedCourse(completedCourse.id))
        closeModal()
    }

    return (
        <div className='modals-div'>
            <h2>Are you sure you want to remove "{completedCourse.course.name}" from the list?</h2>
            <button className='modal-btn' onClick={submit}>Yes</button>
            <button className='modal-keep-btn' onClick={closeModal}>No</button>
        </div>
    )
}

export default DeleteCompletedCourse