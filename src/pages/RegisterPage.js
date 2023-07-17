import React, { useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'

const RegisterPage = () => {

    const { handleUserRegister } = useAuth()
    const [credentials, setCredentials] = useState({
        email: '',
        password1: '',
        password2: ''
    })

    const handleInputChange = (e) => {
        let name = e.target.name
        let value = e.target.value

        setCredentials({ ...credentials, [name]: value })
    }
    return (
        <div className='auth--container'>
            <div className="form--wrapper">
                <form onSubmit={(e) => { handleUserRegister(e, credentials) }}>
                    <div className="field--wrapper">
                        <label>Name:</label>
                        <input
                            name='name'
                            type='text'
                            required
                            placeholder='Enter your Name...'
                            value={credentials.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Email:</label>
                        <input
                            name='email'
                            type='email'
                            required
                            placeholder='Enter your Email...'
                            value={credentials.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Password:</label>
                        <input
                            name='password1'
                            type='password'
                            required
                            placeholder='Enter password...'
                            value={credentials.password1}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <label>Confirm Password:</label>
                        <input
                            name='password2'
                            type='password'
                            required
                            placeholder='Confirm password...'
                            value={credentials.password2}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field--wrapper">
                        <input className='btn btn--lg btn--main'
                            type='submit' value='Login'
                        />
                    </div>
                </form>
                <p>Already have an account? Login <Link to='/login'>here</Link></p>
            </div>
        </div>
    )
}

export default RegisterPage
