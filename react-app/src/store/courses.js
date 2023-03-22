//actions
export const GET_ALL_COURSES = "courses/all"
export const CLEAR_STATE = "courses/clear"
export const GET_SINGLE_COURSE = 'course'

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

export const getSingleCourse = (course) => {
    return {
        type: GET_SINGLE_COURSE,
        course
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

export const fetchSingleCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getSingleCourse(data))
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
        case GET_SINGLE_COURSE:
            newState['course'] = action.course
            return newState
        case GET_ALL_COURSES:
            newState["courses"] = action.courses
            return newState
        default:
            return state
    }
}

export default courseReducer