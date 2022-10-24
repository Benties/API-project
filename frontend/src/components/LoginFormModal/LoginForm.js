import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './loginForm.css'
import { useHistory } from "react-router-dom";
function LoginForm({setLogin}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    const loggedUser = await dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    if(loggedUser.id){
      history.push('/')
    }
  };

  const demoLogIn = () => {
    setCredential('FakeUser1')
    setPassword('password')
    setTimeout(() => {
      setLogin(false)
    },100)
  }
  return (
    <form
    onSubmit={handleSubmit}
    onClick={e => e.stopPropagation()}
    className='loginForm'>
      <ul className="errors" >
        {errors.map((error, idx) => (
          <li key={idx}> <i className='fa fa-exclamation-circle' /> {error}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          placeholder='Username or Email'
          // required
        />
      </label>
      <label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          // required
        />
      </label>
      <button type="submit">Log In</button>
      <button type="submit" onClick={demoLogIn}>Demo Log In</button>
    </form>
  );
}

export default LoginForm;
