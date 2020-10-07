import React, { useState, useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameWork, handleGoogleSignIn, handleSignOut, handleFbLogIn, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';



function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photoURL: '',
    error: '',
    success: ''
  })
  
  initializeLoginFrameWork();

  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" }};

  const handleResponse = (res) => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
  }

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then(res => {
        handleResponse(res)
      });
  }

  const signOut = () => {
      handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      });
  }
  
  const fbSignIn = () => {
      handleFbLogIn()
      .then(res => {
        handleResponse(res);
    });
  }
  

  

  const handleBlur = (e) => {
    console.log(e.target.name, e.target.value);

    let isFieldValid = true;
    if (e.target.name === 'email') {
      // this will return true if email is in right format 
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      isFieldValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(e.target.value);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }
  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(res => {
        handleResponse(res);
    });
    }


    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
      .then(res => {
        handleResponse(res);
    });
    }
    e.preventDefault(); // prevent the default form submit event
  }

  return (
    <div style={{textAlign: 'center'}}>
      <button onClick={googleSignIn}>Sign In</button>
      <br />
      <button onClick={fbSignIn}>Sign In With Facebook</button>

      <h1>Our Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p>

      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser" />
      <label htmlFor="newUser">New User Sign Up</label>
      <form onSubmit={handleSubmit}>
        {
          newUser && <input type="text" onBlur={handleBlur} name="name" id="name" placeholder="name" required />
        }
        <br />
        <input type="email" onBlur={handleBlur} name="email" id="email" placeholder="email address" required />
        <br />
        {/* onChange will capture every change happens to input */}
        {/* onBlur will capture the full change after the input in out of focus */}
        <input type="password" onBlur={handleBlur} name="password" id="pass" placeholder="password" required />
        <br />
        {/* input type => submit inside a form will submit the whole form */}
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{ color: 'crimson' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged In'} Successfully</p>
      }
    </div>
  );
}

export default Login;
