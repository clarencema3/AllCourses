import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';



function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	
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