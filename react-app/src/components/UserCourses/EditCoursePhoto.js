import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePhoto, fetchSingleCourse } from '../../store/courses';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';


const EditPhoto = ({ course }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("photo", photo);
       
        const data = await dispatch(updatePhoto(course.id,formData))
        if (data) {
            setErrors(data)
        } else {
            closeModal()
            history.push(`/courses/${course.id}`)
        }
    }

    return (
        <div className='edit-photo-div'>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-section">
                    <h1>Change course photo?</h1>
                    <input className='form-input' type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required/>
                </div>
                <div className="sign-button-div">
                    <button className="sign-form-button" type="submit">Edit photo</button>
                </div>
            </form>
        </div>
    )
}

export default EditPhoto