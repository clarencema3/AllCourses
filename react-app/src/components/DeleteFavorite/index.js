import React from 'react'
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteFavorite } from "../../store/favorites";


const DeleteFavorite = ({ favoriteId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()


    const submit = (e) => {
        e.preventDefault()
        dispatch(deleteFavorite(favoriteId))
        closeModal()
    }


    return (
        <div className='modals-div'>
            <h1>Delete from favorites list?</h1>
            <button className='modal-btn' onClick={submit}>Delete</button>
            <button className='modal-keep-btn' onClick={closeModal}>Keep</button>
        </div>
    )
}

export default DeleteFavorite