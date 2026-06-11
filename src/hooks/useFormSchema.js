// ===== This is the custome hook to manage the schema =====

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { v4 as uuid } from "uuid";
import {
    setTitle,
    addField,
    deleteField,
    updateField,
    reorderFields,
    addStep,
    deleteStep,
    importSchema,
    resetSchema,
} from "../store/schemaSlice";



const useFormSchema = () => {
    const dispatch = useDispatch();
    const schema = useSelector((state) => state.schema);

    // This part will use the chanege the form title
    const changeTitle = useCallback(
        (newTitle) => dispatch(setTitle(newTitle)),
        [dispatch]
    );

    // This part will add the new field in the form
    const addNewField = useCallback(
        (stepId, fieldConfig) => {
            const field = {
                id: uuid(),           // auto-generate a unique id
                type: "text",
                label: "New Field",
                placeholder: "",
                validate: {},
                conditions: [],
                ...fieldConfig,
            };
            dispatch(addField({ stepId, field }));
            return field.id;
        },
        [dispatch]
    );

    // This will remove the field from the form
    const removeField = useCallback(
        (stepId, fieldId) => dispatch(deleteField({ stepId, fieldId })),
        [dispatch]
    );

    // This part will update the changes in the field
    const updateFieldConfig = useCallback(
        (stepId, fieldId, changes) =>
            dispatch(updateField({ stepId, fieldId, changes })),
        [dispatch]
    );

    // This part will reorder the fields 
    const reorderStepFields = useCallback(
        (stepId, fields) => dispatch(reorderFields({ stepId, fields })),
        [dispatch]
    );

    // This part will add a new step in the form
    const addNewStep = useCallback(() => dispatch(addStep()), [dispatch]);

    // This part will delete the step from the form
    const removeStep = useCallback(
        (stepId) => dispatch(deleteStep(stepId)),
        [dispatch]
    );

    // Load a schema object (from JSON import)
    const loadSchema = useCallback(
        (schemaObj) => dispatch(importSchema(schemaObj)),
        [dispatch]
    );

    // This part will reset the form
    const clearSchema = useCallback(
        () => dispatch(resetSchema()),
        [dispatch]
    );

    // This part will find the step by id
    const getStep = useCallback(
        (stepId) => (schema?.steps || []).find((s) => s.id === stepId) || null,
        [schema?.steps]
    );

    // This part will find the field by id
    const getField = useCallback(
        (fieldId) => {
            for (const step of (schema?.steps || [])) {
                const f = step.fields.find((f) => f.id === fieldId);
                if (f) return f;
            }
            return null;
        },
        [schema?.steps]
    );

    // This part will find the step for the field
    const getStepForField = useCallback(
        (fieldId) => {
            return (schema?.steps || []).find((s) =>
                s.fields.some((f) => f.id === fieldId)
            ) || null;
        },
        [schema?.steps]
    );

    return {
        schema,
        title: schema?.title,
        steps: schema?.steps || [],
        changeTitle,
        addNewField,
        removeField,
        updateFieldConfig,
        reorderStepFields,
        addNewStep,
        removeStep,
        loadSchema,
        clearSchema,
        getStep,
        getField,
        getStepForField,
    };
};

export default useFormSchema;