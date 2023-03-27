export const GET_FAVORITES = 'favorites/all'

export const getFavorites = (favorites) => {
    return {
        type: GET_FAVORITES,
        favorites
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


const initialState = {}

const favoriteReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch(action.type) {
        case GET_FAVORITES:
            newState['favorites'] = action.favorites
            return newState
        default: 
            return state
    }
}

export default favoriteReducer