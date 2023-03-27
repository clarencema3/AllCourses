import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchFavorites } from '../../store/favorites'


const ShowFavorites = () => {
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites)

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])

    if (!favorites) return null


    return (
        <h1>test</h1>
    )
}


export default ShowFavorites