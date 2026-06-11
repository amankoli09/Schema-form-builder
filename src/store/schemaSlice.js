import { createSlice } from "@reduxjs/toolkit";

// Try to load a saved schema from localStorage (so work is never lost)
const loadSaved = () => {
    try {
        const saved = localStorage.getItem("formcraft_schema");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed && Array.isArray(parsed.steps)) {
                return parsed;
            }
        }
        return getDefault();
    } catch {
        return getDefault();
    }
};

// This is what an empty new form looks like
const getDefault = () => ({
    title: "Untitled Form",
    steps: [
        {
            id: "step_1",
            label: "Step 1",
            fields: [],
        },
    ],
});

const schemaSlice = createSlice({
    name: "schema",
    initialState: loadSaved(),
    reducers: {
        // Change the form title
        setTitle(state, action) {
            state.title = action.payload;
        },

        // Add a new field to a specific step
        addField(state, action) {                             // This are the reducer
            const { stepId, field } = action.payload;
            const step = state.steps.find((s) => s.id === stepId);
            if (step) step.fields.push(field);
        },

        // Delete a field from a step
        deleteField(state, action) {                          // This are the reducer
            const { stepId, fieldId } = action.payload;
            const step = state.steps.find((s) => s.id === stepId);
            if (step) step.fields = step.fields.filter((f) => f.id !== fieldId);
        },

        // Update any property of a field (label, placeholder, validation rules, etc)
        updateField(state, action) {                             // This are the reducer
            const { stepId, fieldId, changes } = action.payload;
            const step = state.steps.find((s) => s.id === stepId);
            if (!step) return;
            const field = step.fields.find((f) => f.id === fieldId);
            if (field) Object.assign(field, changes);
        },

        // Reorder fields after drag and drop
        reorderFields(state, action) {                             // This are the reducer
            const { stepId, fields } = action.payload;
            const step = state.steps.find((s) => s.id === stepId);
            if (step) step.fields = fields;
        },

        // Add a new step (new page in multi-step form)
        addStep(state) {                             // This are the reducer
            state.steps.push({
                id: `step_${Date.now()}`,
                label: `Step ${state.steps.length + 1}`,
                fields: [],
            });
        },

        // Delete a step (cannot delete if only 1 step)
        deleteStep(state, action) {                             // This are the reducer
            if (state.steps.length === 1) return;
            state.steps = state.steps.filter((s) => s.id !== action.payload);
        },

        // Load a schema from a JSON file (import feature)
        importSchema(_, action) {                             // This are the reducer  
            return action.payload;
        },

        // Reset everything back to default
        resetSchema() {
            return getDefault();
        },
    },
});

export const {
    setTitle,
    addField,
    deleteField,
    updateField,
    reorderFields,
    addStep,
    deleteStep,
    importSchema,
    resetSchema,
} = schemaSlice.actions;

export default schemaSlice.reducer;