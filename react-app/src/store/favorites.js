export const GET_FAVORITES = 'favorites/all'
export const ADD_FAVORITE = 'favorite/add'

export const getFavorites = (favorites) => {
    return {
        type: GET_FAVORITES,
        favorites
    }
}

export const postFavorite = (favorite) => {
    return {
        type: ADD_FAVORITE,
        favorite
    }
} 


export const fetchFavorites = () => async (dispatch) => {
    const response = await fetch('/api/favorites/')

    if (response.ok) {
        const data = await response.json()
        let normalizedData = {}
        data.forEach(favorite => normalizedData[favorite.id] = favorite)
        dispatch(getFavorites(normalizedData))
    }
}

export const addFavorite = (favorite) => async (dispatch) => {
    const response = await fetch('/api/favorites/', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(favorite)
    })

    if (response.ok) {
        const data = await response.json()
        let normalizedData = {}
        normalizedData[data.id] = data
        dispatch(postFavorite(normalizedData))
    }
}

const initialState = {}

const favoriteReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case ADD_FAVORITE:
            newState['favorite'] = action.favorite
            return newState
        case GET_FAVORITES:
            newState['favorites'] = action.favorites
            return newState
        default: 
            return state
    }
}

export default favoriteReducer