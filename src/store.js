import { configureStore } from '@reduxjs/toolkit'
import formReducer from './slices/form.slice'

export const store = configureStore({
  reducer: { form: formReducer },
})