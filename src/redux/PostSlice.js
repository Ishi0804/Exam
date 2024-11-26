import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../api/apiInstance';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

// Thunks
export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiInstance.get('/posts');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const { data } = await apiInstance.post('/posts', postData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const updatePostThunk = createAsyncThunk(
    'posts/updatePostThunk',
    async ({ id, updateData }, { rejectWithValue }) => {
        try {
            if (!id || !updateData) {
                throw new Error('Invalid ID or update data');
            }
            const response = await apiInstance.patch(`/posts/${id}`, updateData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deletePostThunk = createAsyncThunk(
    'posts/deletePostThunk',
    async (postId, { rejectWithValue }) => {
        try {
            await apiInstance.delete(`/posts/${postId}`);
            return postId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase(updatePostThunk.fulfilled, (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(deletePostThunk.fulfilled, (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            });
    },
});

export default postSlice.reducer;
