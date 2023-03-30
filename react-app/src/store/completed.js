export const GET_COMPLETED = 'completed/all'
export const ADD_COMPLETED = 'completed/add'
export const DELETE_COMPLETED = 'completed/delete'
export const EDIT_COMPLETED = 'completed/edit'


export const getCompleted = (courses) => {
    return {
        type: GET_COMPLETED,
        courses
    }
}

export const postCompleted = (course) => {
    return {
        type: ADD_COMPLETED,
        course
    }
}

export const removeCompleted = (completedCourseId) => {
    return {
        type: DELETE_COMPLETED,
        completedCourseId
    }
}

export const editCompleted = (course) => {
    return {
        type: EDIT_COMPLETED,
        course
    }
}

export const fetchCompleted = () => async (dispatch) => {
    const response = await fetch('/api/completed/')

    if (response.ok) {
        const data = await response.json()
        let normalizedData = {}
        data.forEach(course => normalizedData[course.id] = course)
        dispatch(getCompleted(normalizedData))
    }
}

export const addCompleted = (course) => async (dispatch) => {
    const response = await fetch('/api/completed/new', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        const data = await response.json()
        let normalizedData = {}
        normalizedData[data.id] = data
        dispatch(postCompleted(normalizedData))
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

export const deleteCompletedCourse = (completedCourseId) => async (dispatch) => {
    const response = await fetch(`/api/completed/${completedCourseId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(removeCompleted(completedCourseId))
    }
}

export const editCompletedCourse = (course) => async (dispatch) => {
    const response = await fetch(`/api/completed/${course.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(course)
    })

    if (response.ok) {
        const course = await response.json()
        dispatch(editCompleted(course))
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

const completedReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case EDIT_COMPLETED:
            newState.completed = { ...state.completed }
            newState.completed[action.course.id] = action.course
            return newState
        case DELETE_COMPLETED:
            newState.completed = { ...state.completed }
            newState.course = { ...state.course}
            delete newState.completed[action.completedCourseId]
            return newState
        case ADD_COMPLETED:
            newState['course'] = action.course
            return newState
        case GET_COMPLETED:
            newState['completed'] = action.courses
            return newState
        default: 
            return state
    }
}

export default completedReducer