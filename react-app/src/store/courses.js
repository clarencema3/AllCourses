//actions
export const GET_ALL_COURSES = "courses/all"
export const CLEAR_STATE = "courses/clear"
export const GET_SINGLE_COURSE = 'course'
export const ADD_COURSE = 'course/add'
export const DELETE_COURSE = 'course/delete'
export const EDIT_COURSE = 'course/edit'

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

export const addCourse = (course) => {
    return {
        type: ADD_COURSE,
        course
    }
}

export const removeCourse = (courseId) => {
    return {
        type: DELETE_COURSE,
        courseId
    }
}

export const editCourse = (course) => {
    return {
        type: EDIT_COURSE,
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

export const addNewCourse = (course) => async (dispatch) => {
    const response = await fetch(`/api/courses/`, {
        method: "POST",
        body: course
    })
    
    if (response.ok) {
        const data  = await response.json();
        dispatch(addCourse(data))
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

export const deleteCourse = (courseId) => async (dispatch) => {
    const response = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE"
    })

    if (response.ok) {
        dispatch(removeCourse(courseId))
    }
}

export const updateCourse = (course) => async (dispatch) => {
    const response = await fetch(`/api/courses/${course.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        const course = await response.json()
        dispatch(editCourse(course))
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
        case EDIT_COURSE:
            newState.courses = { ...state.courses }
            newState.courses[action.course.id] = action.course
            return newState
        case DELETE_COURSE:
            newState.course = {...state.course}
            newState.courses = { ...state.courses }
            delete newState.courses[action.courseId]
            return newState
        case ADD_COURSE:
            newState['course'] = action.course
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