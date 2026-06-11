import { createSlice } from "@reduxjs/toolkit";

const valuesSlice = createSlice({
    name: "values",
    initialState: {},

    reducers: {
        setFieldValue: (state, action) => {     // This is the reducer which will be called when the user types in the form fields
            const { fieldId, value } = action.payload;
            state[fieldId] = value;
        },
        resetValues() {
            return {};
        },
    },
});
export const { setFieldValue, resetValues } = valuesSlice.actions;
export default valuesSlice.reducer;
