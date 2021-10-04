import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import validator from 'validator'
import { setError, removeError} from '../../actions/uiError'
import {startRegisterWithEmailPasswordName} from '../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import logo from '../../asset/logo.png'
    

const Registro = () => {
    
    const dispatch = useDispatch();
    const { msjError } = useSelector(state => state.ui);

    const [values, handleInputChange,reset] = useForm({
        nombre: '',
        email: '',
        password: '',
        password2: ''
    })

    //desestructuramos
    const { nombre, email, password, password2 } = values;

    const formValid = () => {
        if (nombre.trim().length === 0) {
            dispatch(setError('nombre requerido'))
            return false
        }
        else if (!validator.isEmail(email)) {
            dispatch(setError('Emial requerido'))
            return false
        }
        else if (password !== password2 || password < 5) {
            dispatch(setError('La contraseña es incorecta'))
            return false
        }

        dispatch(removeError(''))
        return true
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (formValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, nombre))
        }
        reset()
    }

    return (
        <div className="Registro py-5 container text-center">
            <form className="form-signin" onSubmit={handleRegister}>
                {
                    msjError &&
                    (
                        <div className="alert alert-danger">
                            {msjError}
                        </div>
                    )
                }
                <img className="logo" src={logo} alt="" />

                <h1 className="title">Registrate</h1>

                <input
                    type="text"
                    placeholder="Name"
                    name="nombre"
                    className="form-control p-2 mb-2"
                    autoComplete="off"
                    value={nombre}
                    onChange={handleInputChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="form-control p-2 mb-2"
                    autoComplete="off"
                    required=""
                    value={email}
                    onChange={handleInputChange}

                />

                <input
                    type="Password"
                    name="password"
                    id="inputPassword"
                    className="form-control p-2 mb-2"
                    placeholder="Password"
                    required=""
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="Password"
                    name="password2"
                    id="inputPassword2"
                    className="form-control p-2 mb-3"
                    placeholder="Confirm password"
                    required=""
                    value={password2}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-1"
                >
                    Register
                </button>
                <br />
                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>

        </div>
    )
}

export default Registro