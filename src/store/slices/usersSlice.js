import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import {addQuestion} from "./questionsSlice";


export const getUsers = createAsyncThunk(
    "usersSlice/getUsers",
    async (info, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.get('http://localhost:8000/users')
            return response.data
        }
        catch(error){
            console.log(error)
        }
        finally {
            console.log('end')
        }
    }
)

export const getOneUser = createAsyncThunk(
    "usersSlice/getOneUser",
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.get(`http://localhost:8000/users/${id}`)
            return response.data
        }
        catch(error){
            return rejectWithValue('произошла ошибка из запроса')
        }
        finally {

        }
    }
)

export const deleteUser = createAsyncThunk(
    "usersSlice/deleteUser",
    async (id, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.delete(`http://localhost:8000/users/${id}`)
            return id
        }
        catch(error){
            console.log(error.message)
        }
        finally{

        }
    }
)

export const postUsers = createAsyncThunk(
    "usersSlice/postUsers",
    async (newUser, {dispatch, rejectWithValue}) => {
        try{
            const response = await axios.post(`http://localhost:8000/users`, newUser)
            return response.data
        }
        catch(error){
            console.log(error.message)
        }
        finally {

        }
    }
)


export const updateUser = createAsyncThunk(
    "usersSlice/updateUser",
    async (user, {rejectWithValue}) => {
        try{
            const response = await axios.put(`http://localhost:8000/users/${user.id}`, user)
            return response.data
        }
        catch (error){
            console.log(error.message)
        }
        finally {

        }
    }
)

const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        users: [],
        user: {},
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOneUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getOneUser.fulfilled, (state, action) => {
            console.log('данные пришли');
            state.user = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getOneUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(addQuestion, (state, action) => {
            state.error = "Произошло действие из questionsSlice"
        });
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUsers.fulfilled, (state, action) => {
            console.log('get users fulfilled', action.payload);
            state.users = action.payload;
            state.error = null;
            state.loading = false;
        });
        builder.addCase(getUsers.rejected, (state, action) => {
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
            state.error = null;
            state.loading = false;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(postUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(postUsers.fulfilled, (state, action) => {
            state.users.push(action.payload);
            state.error = null;
            state.loading = false;
        });
        builder.addCase(postUsers.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.users = state.users.map(user => user.id === action.payload.id ? action.payload : user);
            state.error = null;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        })
    }
})

const {} = usersSlice.actions;

export default usersSlice.reducer;