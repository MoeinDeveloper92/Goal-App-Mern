import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import goalService from "./goalService"
//every redux resource that we have, has a structure like this.
const initialState = {
    goals: [],
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ""
}

//Creating goal
export const createGoal = createAsyncThunk("goal/create", async (goalData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// Get all the user goals
export const getGoals = createAsyncThunk("goal/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.getGoals(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Delete Goal
export const deleteGoal = createAsyncThunk("goal/deleteGoal", async (goalId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.deleteGoal(goalId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) ||
            error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: "goal",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            })
            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.message = action.payload
                state.isError = true
            })
            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = action.payload
            })
            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) => goal._id !== action.payload.id)
            })
            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})


export const { reset } = goalSlice.actions
export default goalSlice.reducer