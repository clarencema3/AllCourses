import { useState } from "react";
import { useHistory } from "react-router-dom";
import { addNewCourse } from "../../store/courses";
import { useDispatch, useSelector } from "react-redux";
import './AddCourse.css'


const AddCourse = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState(0);
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [course_url, setCourse_url] = useState('');
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);


    const user = useSelector(state => state.session.user)
   
    if (!user) {
        history.push('/')
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", Number(price));
        formData.append("type", Number(type));
        formData.append("latitude", Number(0));
        formData.append("longitude", Number(0));
        formData.append("address", address);
        formData.append("city", city);
        formData.append("state", state);
        formData.append("country", country);
        formData.append("course_url", course_url);
        formData.append("photo", photo);
       
        const data = await dispatch(addNewCourse(formData))
        if (data) {
            setErrors(data)
        } else {
            history.push('/')
        }
    }
   
    return (
        <div className="create-form-div">
            <form onSubmit={handleSubmit} className='course-form' encType="multipart/form-data">
                <h1>Add a Course</h1>
                <ul>
                    {errors && errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
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
                        <select className='form-input' onChange={(e) => setType(e.target.value)} defaultValue='Select Type'>
                            <option disabled hidden>Select Type</option>
                            <option value={+9}>9 Hole</option>
                            <option value={+18}>18 Hole</option>
                        </select>
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
                        <input className='form-input' type="url" value={course_url} onChange={(e) => setCourse_url(e.target.value)} placeholder='Ex: https://www.google.com' required/>
                    </div>
                    <div className="form-section">
                        <div>
                            Photo of course
                        </div>
                        <input className='form-input' type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} required/>
                    </div>
                    <div className="sign-button-div">
                        <button className="sign-form-button" type="submit">Add your course</button>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default AddCourse