import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false, error: null,
}

export const form = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormInProgress: (state) => {
      return {
        ...state,
        loading: true,
        error: null
      }
    },
    setFormSuccess: (state, action) => {
      return {
        ...state,
        forms: state?.forms?.length ? [...state.forms, action.payload.data] : [action.payload.data],
        loading: false,
        error: null
      }
    },
    setFormError: (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    },
  },
})

export const { setFormInProgress, setFormSuccess, setFormError } = form.actions

export const saveForm = (form) => (dispatch) => {
  dispatch(setFormInProgress());
  try {
    dispatch(setFormSuccessful(form));
  } catch (err) {
    dispatch(setFormError(err))
  }
}

export default form.reducer