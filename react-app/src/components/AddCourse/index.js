import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addNewCourse } from "../../store/courses";
import { useDispatch, useSelector } from "react-redux";


const AddCourse = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [course_url, setCourse_url] = useState('');
    const [photo, setPhoto] = useState('');
    const [errors, setErrors] = useState([]);

    
    return (
        <div>
            <h1>Add a Course</h1>
            <form>
                <div className="form-section-div">
                    <div>
                        <div>
                            Name
                        </div>
                        <input type="text" value={name} className="form-input" onChange={(e) => setName(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            Description
                        </div>
                        <textarea type="text" value={description} className="form-input" onChange={(e) => setDescription(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            Price
                        </div>
                        <input type="text" value={price} className="form-input" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            Type
                        </div>
                        <select onChange={(e) => setType(e.target.value)}>
                            <option disabled selected hidden>Select Type</option>
                            <option value={9}>9 Hole</option>
                            <option value={18}>18 Hole</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            Latitude
                        </div>
                        <input type="text" value={lat} className="form-input" onChange={(e) => setLat(e.target.value)}/>
                    </div>
                    <div>
                        <div>
                            Longitude
                        </div>
                        <input type="text" value={lng} className="form-input" onChange={(e) => setLng(e.target.value)} required />
                    </div>
                    <div>
                        <div>
                            Address
                        </div>
                        <input type="text" value={address} className="form-input" onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            City
                        </div>
                        <input type="text" value={city} className="form-input" onChange={(e) => setCity(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            State
                        </div>
                        <input type="text" value={state} className="form-input" onChange={(e) => setState(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            Country
                        </div>
                        <input type="text" value={country} className="form-input" onChange={(e) => setCountry(e.target.value)} required/>
                    </div>
                    <div>
                        <div>
                            Course Website
                        </div>
                        <input type="text" value={course_url} className="form-input" onChange={(e) => setCourse_url(e.target.value)} required/>
                    </div>
                    <div className="sign-form-section-div sign-button-div">
						<button className="sign-form-button" type="submit">Add your course</button>
					</div>
                </div>
            </form>
        </div>
    )
}

export default AddCourse