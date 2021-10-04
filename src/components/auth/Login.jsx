import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {startLoginEmailPassword, startGoogleLogin, startFacebookLogin} from '../../actions/auth'
import {useForm} from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import '../../styles/main.css'


const Login = () => {

   const dispatch = useDispatch();
   
   const {loading} = useSelector(state => state.ui)

    const [values, handleInputChange] = useForm({
        email: '',
        password: ''
    })
    //desestructurar 
    const { email, password } = values;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(startLoginEmailPassword(email,password))
    }
    

    const handleGoogleLogin = () => {
        console.log('Google');
        dispatch(startGoogleLogin())
    }

    const handleFacebookLogin = () => {
        console.log('Facebook');
        dispatch(startFacebookLogin())
    }
    
    return (
        <div className="Registro py-5 container text-center">
            <h1 className="color">Bienvenidos</h1>
            <img src="https://c.tenor.com/a7Wi8j3rYmEAAAAj/pokemon-legendary.gif" alt="" />
            <form className="form-signin">
                <h1 className="h4 mb-3 font-weight-normal text-white">
                    Inicio de sesión
                </h1>

                <input
                    type="email"
                    name="email"
                    id="inputEmail"
                    className="form-control mt-1"
                    placeholder="Email"
                    required=""
                    value={email}
                    onChange={handleInputChange}

                />

                <input
                    type="Password"
                    id="inputPassword"
                    name="password"
                    className="form-control mt-1"
                    placeholder="Contreña"
                    required=""
                    value={password}
                    onChange={handleInputChange}

                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    disabled={loading}
                >
                    Login
                </button>

                <div className="text-white p-2">
                    <p>Login with social networks</p>

                    <div className="google-btn btn-danger"  
                         onClick={handleGoogleLogin}>
                        <div className="google-icon-wrapper"
                        
                        >
                            <img className="google-icon"
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>
                <div
                    className="google-btn btn-warning"
                        onClick={handleFacebookLogin}
                >
                    <div className="google-icon-wrapper" >
                        <img className="google-icon"
                            src="https://image.flaticon.com/icons/png/512/20/20673.png"
                            alt="google button" 
                            width="30px"/>
                    </div>
                    <p className="btn-text ">
                        <b>Sign in with Facebook</b>
                    </p>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
            </form>
        </div>
    )
}

export default Login