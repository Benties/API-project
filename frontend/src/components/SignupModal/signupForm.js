import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password, firstName, lastName }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form className="signupForm" onSubmit={handleSubmit}>
      <ul className="errors">
        {errors.map((error, idx) => <li key={idx}> <i className='fa fa-exclamation-circle' /> {error}</li>)}
      </ul>
      <label>
        <input
          type="text"
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}

        />
      </label>
      <label>
        <input
          type="text"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}

        />
      </label>
      <label>
        <input
          type="text"
          value={firstName}
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}

        />
      </label>
      <label>
        <input
          type="text"
          value={lastName}
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}

        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          placeholder='password'
          onChange={(e) => setPassword(e.target.value)}

        />
      </label>
      <label>
        <input
          type="password"
          value={confirmPassword}
          placeholder='Confirm Password'
          onChange={(e) => setConfirmPassword(e.target.value)}

        />
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignupFormPage;
