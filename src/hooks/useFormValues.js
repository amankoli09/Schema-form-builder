import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFieldValue, resetValues } from "../store/valuesSlice";
import { validateField, validateAllFields } from "../engine/validationEngine";
import { shouldShowField } from "../engine/conditionEvaluator";

const useFormValues = () => {
    const dispatch = useDispatch();
    const formValues = useSelector((state) => state.values);

    // They dont need to be global 
    const [errors, setErrors] = useState({});

    // This will get the current value of a field by its id
    const getValue = useCallback(
        (fieldId) => formValues[fieldId] ?? "",
        [formValues]
    );

    // Get the current error message for a field
    const getError = useCallback(
        (fieldId) => errors[fieldId] ?? null,
        [errors]
    );

    const handleChange = useCallback(
        (field, value) => {
            dispatch(setFieldValue({ fieldId: field.id, value }));

            // Only re-validate if there is already an error showing
            if (errors[field.id]) {
                const err = validateField(field, value);
                setErrors((prev) => ({ ...prev, [field.id]: err }));
            }
        },
        [dispatch, errors]
    );

    const handleBlur = useCallback(
        (field) => {
            const value = formValues[field.id];
            const err = validateField(field, value);
            setErrors((prev) => ({ ...prev, [field.id]: err }));
        },
        [formValues]
    );

    const validateStep = useCallback(
        (fields) => {
            const newErrors = validateAllFields(fields, formValues);
            setErrors((prev) => ({ ...prev, ...newErrors }));
            return Object.keys(newErrors).length === 0;
        },
        [formValues]
    );

    const isVisible = useCallback(
        (field) => shouldShowField(field, formValues),
        [formValues]
    );

    const resetForm = useCallback(() => {
        dispatch(resetValues());
        setErrors({});
    }, [dispatch]);

    return {
        formValues,
        errors,
        getValue,
        getError,
        handleChange,
        handleBlur,
        validateStep,
        isVisible,
        resetForm,
    };
};

export default useFormValues;