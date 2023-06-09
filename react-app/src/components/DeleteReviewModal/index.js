import React from 'react'
import { useModal } from '../../context/Modal'
import { useDispatch } from 'react-redux'
import { deleteReview } from '../../store/reviews'
import { fetchSingleCourse } from '../../store/courses'
import './DeleteReview.css'

const DeleteReviewModal = ({ review, course }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const submit = (e) => {
        e.preventDefault()
        dispatch(deleteReview(review.id))
        dispatch(fetchSingleCourse(course.id))
        closeModal()
    }

    
    return (
        <div className='modals-div'>
            <h1>Delete review?</h1>
            <p>Deleting a review will erase it permanently.</p>
            <div className='delete-rev-btn-div'>
                <button className='modal-btn' onClick={submit}>Delete</button>
                <button className='modal-keep-btn' onClick={closeModal}>Keep</button>
            </div>
        </div>
    )
}


export default DeleteReviewModal