import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCourse, fetchSingleCourse } from '../../store/courses';
import { useModal } from '../../context/Modal';
import { useHistory } from 'react-router-dom';


const EditCourseModal = ({course}) => {
    const { closeModal } = useModal()
    const history = useHistory()
    const dispatch = useDispatch();
    const [name, setName] = useState(course.name)
    const [description, setDescription] = useState(course.description)
    const [price, setPrice] = useState(course.price);
    const [type, setType] = useState(course.type);
    const [lat, setLat] = useState(course.latitude);
    const [lng, setLng] = useState(course.longitude);
    const [address, setAddress] = useState(course.address);
    const [city, setCity] = useState(course.city);
    const [state, setState] = useState(course.state);
    const [country, setCountry] = useState(course.country);
    const [course_url, setCourse_url] = useState(course.course_url);
    const [photo, setPhoto] = useState(course.photo);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        course.name = name
        course.description = description
        course.price = price
        course.type = type
        course.latitude = lat
        course.longitude = lng
        course.address = address
        course.city = city
        course.state = state
        course.country = country
        course.course_url = course_url
        dispatch(updateCourse(course))
        dispatch(fetchSingleCourse(course.id))
        closeModal()
        history.push(`/courses/${course.id}`)
    }

    return (
        <div className="create-form-div">
            <form onSubmit={handleSubmit} >
                <h1>Edit a course</h1>
                <div className="form-section-div">
                    <div className="form-section">
                        <div>
                            Name
                        </div>
                        <input className='form-input' type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Description
                        </div>
                        <textarea minLength={5} className='form-input' rows={15} type="text" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Price
                        </div>
                        <input className='form-input' min={1} type="number" value={price} onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Type
                        </div>
                        <select className='form-input' onChange={(e) => setType(e.target.value)}>
                            <option disabled hidden>Select Type</option>
                            <option value={+9}>9 Hole</option>
                            <option value={+18}>18 Hole</option>
                        </select>
                    </div>
                    <div className="form-section">
                        <div>
                            Latitude
                        </div>
                        <input className='form-input' type="number" value={lat} onChange={(e) => setLat(e.target.value)}/>
                    </div>
                    <div className="form-section">
                        <div>
                            Longitude
                        </div>
                        <input className='form-input' type="number" value={lng} onChange={(e) => setLng(e.target.value)} />
                    </div>
                    <div className="form-section">
                        <div>
                            Address
                        </div>
                        <input className='form-input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            City
                        </div>
                        <input className='form-input' type="text" value={city} onChange={(e) => setCity(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            State
                        </div>
                        <input className='form-input' type="text" value={state} onChange={(e) => setState(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Country
                        </div>
                        <input className='form-input' type="text" value={country} onChange={(e) => setCountry(e.target.value)} required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Course Website
                        </div>
                        <input className='form-input' type="url" value={course_url} onChange={(e) => setCourse_url(e.target.value)} required/>
                    </div>
                    <div className="sign-button-div">
						<button className="sign-form-button" type="submit">Update your course</button>
					</div>
                </div>
            </form>
        </div>
    )
}

export default EditCourseModal