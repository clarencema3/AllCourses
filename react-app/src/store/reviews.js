export const MAKE_REVIEW = 'review/add'
export const UPDATE_REVIEW = 'review/edit'
export const DELETE_REVIEW = 'review/delete'


export const createReview = (review) => {
    return {
        type: MAKE_REVIEW,
        review
    }
}

export const removeReview = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

export const updateReview = (review) => {
    return {
        type: UPDATE_REVIEW,
        review
    }
}

export const postReview = (review) => async (dispatch) => {
    const response = await fetch('/api/reviews/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json()
        const normalizedData = {}
        normalizedData[review.id] = review
        dispatch(createReview(normalizedData))
        return null
    } else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
}

export const deleteReview = (reviewId) => async(dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeReview(reviewId))
    }
}

export const editReview = (review) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(review)
    })
  
    if (response.ok) {
      const review = await response.json();
      const normalizedData = {}
      normalizedData[review.id] = review
      dispatch(updateReview(normalizedData))
    }
  }

const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case UPDATE_REVIEW:
            newState.reviews = { ...state.reviews }
            newState.reviews['review'] = action.review
            return newState
        case DELETE_REVIEW:
            newState.reviews = { ...state.reviews }
            delete newState.reviews[action.reviewId]
            return newState
        case MAKE_REVIEW:
            newState.reviews = { ...state.reviews } 
            newState.reviews['review'] = action.review
            return newState
        default:
            return state
    }
}

export default reviewsReducer