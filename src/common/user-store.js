import { configureStore } from '@reduxjs/toolkit'
import AppReducer from './Reducer'


export default configureStore({
    reducer: AppReducer
});