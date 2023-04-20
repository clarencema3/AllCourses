import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton';
import { fetchCourses } from '../../store/courses'
import './Navigation.css';



function Navigation({ isLoaded }){
	const history = useHistory()
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user);
	const courses = useSelector(state => state.courses.courses)
	const [value, setValue] = useState('')

	useEffect(() => {
        dispatch(fetchCourses())
    }, [dispatch])

	if (!courses) return <div>Loading...</div>
	let courseSearch = courses ? Object.values(courses) : []

	const onChangeHandler = (e) => {
		setValue(e.target.value)
	}

	const onClickHandler = (id) => {
		history.push(`/courses/${id}`)
		setValue("")
	}

	const filterData = (data) => {
		const filteredData = data.filter(course => {
			const searchInfo = value.toLowerCase()
			const courseName = course.name.toLowerCase()
			return searchInfo && courseName.startsWith(searchInfo) && courseName !== searchInfo
		})

		const resultList = filteredData.slice(0, 6)
		return resultList
	}

	let userLinks
	if (sessionUser) {
		userLinks = (
			<div className='user-btn-div'>
				<NavLink to="/courses/new" className='userButtons'>Add Course</NavLink>
				<NavLink to="/courses/favorites" className='userButtons'>Favorites</NavLink>
				<NavLink to="/courses/completed" className='userButtons'>Completed</NavLink>
				<NavLink to="/courses/current" className='userButtons'>My Courses</NavLink>
			</div>
		)
	}


	return (
		<div className='nav-container white-space'>
			<div className='nav-home'>
				<NavLink exact to="/" className='home-button'>AllCourses</NavLink>
				{userLinks}
			</div>
			<div className='nav-search'>
				<input className="nav-search-bar" type="text" placeholder='Search by course name' onChange={onChangeHandler} value={value} />
				<div className={value ? 'search-dropdown' : "hidden"}>
					{filterData(courseSearch).map(item => (
						<div key={item.id} className='search-results' onClick={() => onClickHandler(item.id)}>
							<div>{item.name}</div>
						</div>
					))}
				</div>
			</div>
			<div className='right-nav-buttons'>
				{isLoaded && (
					<div className='nav-buttons-profile'>
						<ProfileButton user={sessionUser} />
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;