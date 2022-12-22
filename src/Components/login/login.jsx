import React from 'react';
import '../../style.css';

const image = window.location.origin + "/Assets/images/Login/Title.png";
// const LoginImg = window.location.origin + "/Assets/images/Login/Login_btn.png";
function login() {
  return (
    <>
        <div className='login-main'>
            <div className='login-bg'>
                <div className='logo'>
                    <img src={image} alt='tesco logo'/>
                </div>
                <div className='text-box'>
                    <input id="usrename" type="text" placeholder='Please enter your username' autoComplete='off' autoFocus required></input><br></br><br></br>
                    <input id="usrename" type="password" placeholder='Please enter your password' autoComplete='off' required></input><br></br><br></br>
                </div>
                <div className='rememberMe'>
                <label for="Remember">
                    <input type="checkbox" id="Remember" name="Remember ME" value="Remember"/>
                    Remember Me</label>
                </div>
                <div className='loginBtn'>
                    <button id="loginBtn">L O G I N</button>
                </div>
                

            </div>
        </div>

    </>
  )
}

export default login