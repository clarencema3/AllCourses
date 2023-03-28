import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";


const AddFavorite = ({ courseId, userId }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    

    return (
        <h1>test</h1>
    )
}

export default AddFavorite