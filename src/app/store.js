import { configureStore } from '@reduxjs/toolkit';
import PostSlice from '../redux/PostSlice.js';
import UserSlice from '../redux/UserSlice.js';

const store = configureStore({
    reducer: {
        posts: PostSlice,
        users: UserSlice
    },

});

export default store;