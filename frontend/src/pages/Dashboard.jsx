import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import GoalForm from '../components/GoalForm'
import Spinner from "../components/Spinner"
import { getGoals, reset } from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'


const Dashboard = () => {
    const navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message, goals } = useSelector((state) => state.goal)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getGoals())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, dispatch])

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dashboard</p>
            </section>
            <GoalForm />

            <section className="content">
                {goals.length > 0 ? (<div className='goals'>
                    {goals.map((goal) => (
                        <GoalItem key={goal.id} goal={goal} />
                    ))}
                </div>) : (<h3>You have not set any goals</h3>)}
            </section>
        </>
    )
}

export default Dashboard