import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        choices: {
            language: '',
            role: ''
        }
    },
    reducers: {
        updateChoices: (state, action) => {
            state.choices = { ...state.choices, ...action.payload }
        }
    }
})

export const { updateChoices } = userSlice.actions
export default userSlice.reducer