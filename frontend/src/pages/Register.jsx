import { useState, useEffect } from 'react'
import { FaUser } from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom'
import { register, reset } from "../features/auth/authSlice"
import { toast } from "react-toastify"
import Spinner from '../components/Spinner'


const Register = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: ""
    })

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const { name, email, password, password2 } = formData

    const { isError, isSuccess, user, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess || user) {
            navigate("/")
        }

        dispatch(reset())

    }, [user, isSuccess, isError, message, dispatch, navigate])

    const handleChange = (e) => {
        setFormData((preState) => ({
            ...preState,
            [e.target.id]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== password2) {
            toast.error("Passwords do not match")
        } else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser />Register
                </h1>
                <p>Please Create an Account!</p>
            </section>

            <section className="form">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id='name'
                            name='name'
                            value={name}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='Enter your Email'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password'
                            name='password'
                            value={password}
                            onChange={handleChange}
                            placeholder='Enter your name'
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            id='password2'
                            name='password2'
                            value={password2}
                            onChange={handleChange}
                            placeholder='Confirm Password'
                        />
                    </div>

                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register