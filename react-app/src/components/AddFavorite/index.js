import React, { useEffect } from "react";
import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, fetchFavorites } from "../../store/favorites";
import DeleteFavorite from '../DeleteFavorite'

const AddFavorite = ({ course_id, user_id }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const favorites = useSelector(state => state.favorites.favorites)
    
    const favorited = {
        "course_id": course_id,
        "user_id": user_id
    }

    useEffect(() => {
        dispatch(fetchFavorites())
    }, [dispatch])
    
    if (!favorites) return null
    const favoritesArr = Object.values(favorites)
    const existingFavorite = favoritesArr.find(favorite => favorite.user_id === user_id && favorite.course_id === course_id)
   

    const submit = (e) => {
        e.preventDefault()
        dispatch(addFavorite(favorited))
        closeModal()
    }
    return (
        <div className="modals-div">
            {!existingFavorite ?
            <>
                <h1>Add to favorites</h1>
                <button className='modal-btn' onClick={submit}>Add</button>
                <button className="modal-keep-btn" onClick={closeModal}>Close</button> 
            </> :
                <DeleteFavorite favoriteId={existingFavorite.id}/>
            }
        </div>
    )
}

export default AddFavorite