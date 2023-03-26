export const MAKE_REVIEW = 'review/add'

export const createReview = (review) => {
    return {
        type: MAKE_REVIEW,
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


const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case MAKE_REVIEW:
            console.log('newState', newState)
            console.log('action', action)
            newState.reviews = { ...state.reviews } 
            newState.reviews['review'] = action.review
            return newState
        default:
            return state
    }
}

export default reviewsReducer