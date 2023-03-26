import React from 'react';
import './ReadReviews.css'
import OpenModalButton from '../OpenModalButton';
import { useSelector } from 'react-redux';
import CreateReviewModal from '../CreateReviewModal';
import DeleteReviewModal from '../DeleteReviewModal';


const ReadReviews = ({ course }) => {
    const reviewsArr = course.reviews;
    const user = useSelector(state => state.session.user)
    

    const graphBar1 = () => {
        let firstBar = 0
        reviewsArr.forEach(review => {
            if (review.rating === 1.0) {
                firstBar += 1
            }
        })
        return firstBar
    }

    const graphBar2 = () => {
        let secondBar = 0
        reviewsArr.forEach(review => {
            if (review.rating === 2.0) {
                secondBar += 1
            }
        })
        return secondBar
    }

    const graphBar3 = () => {
        let thirdBar = 0
        reviewsArr.forEach(review => {
            if (review.rating === 3.0) {
                thirdBar += 1
            }
        })
        return thirdBar
    }

    const graphBar4 = () => {
        let fourthBar = 0
        reviewsArr.forEach(review => {
            if (review.rating === 4.0) {
                fourthBar += 1
            }
        })
        return fourthBar
    }

    const graphBar5 = () => {
        let fifthBar = 0
        reviewsArr.forEach(review => {
            if (review.rating === 5.0) {
                fifthBar += 1
            }
        })
        return fifthBar
    }

    const getAvgRating = () => {
        if (reviewsArr.length >= 1) {
            let average = 0
            reviewsArr.forEach(review => {
                average += review.rating
            })
            return <h2 className='avg-num'>{Number(average / reviewsArr.length).toFixed(1)}</h2>
        } else {
            return <p>No reviews yet</p>
        }
    }

    const numReviews = () => {
        if (reviewsArr.length === 1) {
            return <p>{reviewsArr.length} review</p>
        } else if (reviewsArr.length === 0){
            return ''
        }  else {
            return <p>{reviewsArr.length} reviews</p>
        }
    }

    const reviewedUser = reviewsArr.find(review => review.user_id === user?.id)
    console.log('reviewed user',reviewedUser)
    console.log('current user', user)
    const writeReview = () => {
        if (!user) return ''
        if (user?.id === course.user.id) {
            return ''
        } else if (user?.id === reviewedUser?.user_id) {
            return ''
        } else {
            return (
                <div className='post-review'>
                    <OpenModalButton 
                    modalClass='post-review-btn'
                    buttonText='Write review'
                    modalComponent={
                        <CreateReviewModal course={course} user={user}/>
                    }
                    />
                </div>
            )
        }
    }

    const deleteAndEditBtns = () => {
        if (user?.id === reviewedUser?.user_id) {
            return (
                <div className='edit-del-div'>
                    <OpenModalButton
                    buttonText='Edit'
                    modalClass='del-edit-rev-btn'
                    
                    />
                    <OpenModalButton 
                    buttonText='Delete'
                    modalClass='del-edit-rev-btn'
                    modalComponent={
                        <DeleteReviewModal review={reviewedUser} course={course}/>
                    }
                    />
                </div>
            )
        } else {
            return null
        }
    }

    console.log(reviewsArr)
    return (
        <div className='reviews-section'>
            <div className='reviews-summary'>   
                <div className='review-chart'>
                    <table>
                        <tbody>
                            <tr>
                                <th>5 <i className="fas fa-star rev-star" /> :</th>
                                <td>{graphBar5()}</td>
                            </tr>
                            <tr>
                                <th>4 <i className="fas fa-star rev-star" /> :</th>
                                <td>{graphBar4()}</td>
                            </tr>
                            <tr>
                                <th>3 <i className="fas fa-star rev-star" /> :</th>
                                <td>{graphBar3()}</td>
                            </tr>
                            <tr>
                                <th>2 <i className="fas fa-star rev-star" /> :</th>
                                <td>{graphBar2()}</td>
                            </tr>
                            <tr>
                                <th>1 <i className="fas fa-star rev-star" /> :</th>
                                <td>{graphBar1()}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='review-avg'>
                    {getAvgRating()}
                    {numReviews()}
                </div>
                {writeReview()}
            </div>
            <div className='user-review-div'>
                <div className='review-container'>
                    {reviewsArr.map(review => (
                        <div key={review.id}>
                            {review.user_id === user.id ?
                                <div className='edit-del-div'>
                                    <OpenModalButton
                                    buttonText='Edit'
                                    modalClass='del-edit-rev-btn'
                                    
                                    />
                                    <OpenModalButton 
                                    buttonText='Delete'
                                    modalClass='del-edit-rev-btn'
                                    modalComponent={
                                        <DeleteReviewModal review={reviewedUser} course={course}/>
                                    }
                                    />
                                </div> :
                                null
                            }
                            <p className='reviewer-name'>{review.reviewer_first_name} {review.reviewer_last_name}</p>
                            <p className='num-stars'>{review.rating}<i className="fas fa-star rev-star" /> · {review.timestamp.slice(5, 16)}</p>
                            <p className='user-review'>{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>  
        </div>
    )
}

export default ReadReviews