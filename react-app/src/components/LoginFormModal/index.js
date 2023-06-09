import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };

  const handleDemoClick = async () => {
    setPassword("password")
    setEmail("demo@aa.io")
    await dispatch(login("demo@aa.io", "password"))
    closeModal()
  }

  return (
    <div className="login-form-container">
      <div className="login-form-div">
        <p className="login-form-header">Welcome back.</p>
        <p className="login-form-header">Log in and start exploring.</p>
        <form onSubmit={handleSubmit} className="login-form-form">
          <ul>
            <li>{errors[0]}</li>
          </ul>
          <div className="login-form-section-div">
            <label>
              <div>
                Email Address
              </div>
              <input
                type="text"
                value={email}
                className="login-form-input"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="login-form-section-div">
            <label>
              <div>
                Password
              </div>
              <input
                type="password"
                value={password}
                className="login-form-input"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="login-form-section-div">
            <button className="login-form-buttons-login" type="submit">Log In</button>
          </div>
          <div className="login-form-section-div">
            <button className="login-form-buttons-demo" onClick={() => handleDemoClick()}>Demo User</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginFormModal;
