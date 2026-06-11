import { configureStore } from "@reduxjs/toolkit";
import schemaReducer from "./schemaSlice";
import valuesReducer from "./valuesSlice";

// This is the main Redux store
// schema = the form structure (fields, steps, labels, rules)
// values = what the user is typing in the form fields

const store = configureStore({
    reducer: {
        schema: schemaReducer,
        values: valuesReducer,
    },
});

export default store;