//actions
export const GET_ALL_COURSES = "courses/all"
export const CLEAR_STATE = "courses/clear"

//action creators
export const clearState = () => {
    return {
        type: CLEAR_STATE
    }
}

export const getCourses = (courses) => {
    return {
        type: GET_ALL_COURSES,
        courses
    }
}

//thunks
export const fetchCourses = () => async (dispatch) => {
    const response = await fetch("/api/courses/")

    if (response.ok) {
        const data = await response.json();
        let normalizedData = {};
        data.forEach((course) => normalizedData[course.id] = course)
        dispatch(getCourses(normalizedData))
    }
}

const initialState = {};

//reducer
const courseReducer = (state = initialState, action) => {
    let newState = {...state}
    switch (action.type) {
        case CLEAR_STATE:
            newState.course = {}
            return newState
        case GET_ALL_COURSES:
            newState["courses"] = action.courses
            return newState
        default:
            return state
    }
}

export default courseReducer