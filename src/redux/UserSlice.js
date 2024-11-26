import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../api/apiInstance';
import { useNavigate } from 'react-router-dom';

// Create User Thunk for Registration
export const createUser = createAsyncThunk(
    'user/createUser',
    async (userData, { rejectWithValue }) => {
        console.log(userData);

        try {
            const response = await apiInstance.post('/users', userData);
            return response.data; // Return the created user data
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

// Login User Thunk
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials, { rejectWithValue }) => {
        console.log(credentials);
        try {
            const findUser = await apiInstance.get("/users");
            
            const user = findUser.data.find(user => 
                user.email === credentials.email && user.password === credentials.password
            );
            console.log(user);
            
            if (user) {
                return {user, navigate: credentials.navigate};
            } else {
                throw new Error('User not found or invalid credentials');
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
            localStorage.removeItem("token")
        },
    },
    extraReducers: (builder) => {
        builder
            // Create User Cases
            .addCase(createUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                localStorage.setItem('token', JSON.stringify(action.payload.id));
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Login User Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                localStorage.setItem('token', JSON.stringify(action.payload.id));
                action.payload.navigate("/")
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                action.payload.navigate("/login")
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
