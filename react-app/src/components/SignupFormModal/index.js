import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(firstName, lastName, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="sign-form-container">
			<div className="sign-form-div">
				<div className="sign-form-header">Sign Up</div>
				<form onSubmit={handleSubmit} className="sign-form-form">
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<div className="sign-form-section-div">
						<label>
							<div>
								Email
							</div>
							<input
								type="text"
								value={email}
								className="sign-form-input"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="sign-form-section-div">
						<label>
							<div>
								First Name
							</div>
							<input
								type="text"
								value={firstName}
								className="sign-form-input"
								onChange={(e) => setFirstName(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="sign-form-section-div">
						<label>
							<div>
								Last Name
							</div>
							<input
								type="text"
								value={lastName}
								className="sign-form-input"
								onChange={(e) => setLastName(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="sign-form-section-div">
						<label>
							<div>
								Password
							</div>
							<input
								type="password"
								value={password}
								className="sign-form-input"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="sign-form-section-div">
						<label>
							<div>
								Confirm Password
							</div>
							<input
								type="password"
								value={confirmPassword}
								className="sign-form-input"
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
							/>
						</label>
					</div>
					<div className="sign-form-section-div sign-button-div">
						<button className="sign-form-button" type="submit">Sign Up</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignupFormModal;