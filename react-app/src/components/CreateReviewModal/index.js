import React, { useState, useEffect } from 'react';
import { useModal } from '../../context/Modal';
import { useDispatch } from 'react-redux';
import { postReview } from '../../store/reviews';
import { fetchSingleCourse } from '../../store/courses';
import './CreateReview.css'

const CreateReviewModal = ({ course, user }) => {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false)

    useEffect(() => {
        const errors = [];
        if (review.length < 1) errors.push('Review is required')
        if (rating < 1) errors.push('Star rating is required')
        setErrors(errors);
    }, [rating, review])


    const handleClick = (value) => {
        setRating(value)
      }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        const newReview = {
            'rating': rating,
            'review': review,
            'course_id': course.id,
            'user_id': user.id
        }
        const data = await dispatch(postReview(newReview))
        if (data) {
            setErrors(data)
        } else {
            dispatch(fetchSingleCourse(course.id))
            closeModal()
        }
    }

    return (
        <form className="review-form">
            <h2>{course.name}</h2>
            <ul>
                {submitted && errors && errors.map((error, idx) => (
                    <li key={idx}>{error}</li>
                ))}
            </ul>
            <div className="star__container">
                <div className="rate">
                <input type="radio" id="star5" name="rate" value={rating} onClick={() => handleClick(5)} />
                <label htmlFor="star5" title="text">5 stars</label>
                <input type="radio" id="star4" name="rate" value={rating} onClick={() => handleClick(4)} />
                <label htmlFor="star4" title="text">4 stars</label>
                <input type="radio" id="star3" name="rate" value={rating} onClick={() => handleClick(3)} />
                <label htmlFor="star3" title="text">3 stars</label>
                <input type="radio" id="star2" name="rate" value={rating} onClick={() => handleClick(2)} />
                <label htmlFor="star2" title="text">2 stars</label>
                <input type="radio" id="star1" name="rate" value={rating} onClick={() => handleClick(1)} />
                <label htmlFor="star1" title="text">1 star</label>
                </div>
            </div>
            <div className="review-text-div">
                <textarea
                className="review-input-text"
                placeholder="Share your thoughts about the course so others know what to expect."
                rows='10'
                cols='40'
                value={review}
                onChange={(e) => setReview(e.target.value)}
                ></textarea>
            </div>
            <div className='rev-btn-div'>
                <button className="submit-rev-btn" onClick={handleSubmit}>
                    Post
                </button>
            </div>
        </form>
    )
}

export default CreateReviewModal