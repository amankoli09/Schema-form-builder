import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

const useLocalStorage = () => {
    const schema = useSelector((state) => state.schema);
    const timer = useRef(null);

    useEffect(() => {
        // This will clear the previous timer so we dont save multiple times
        if (timer.current) clearTimeout(timer.current);

        // This will wait 400ms then save
        timer.current = setTimeout(() => {
            try {
                localStorage.setItem("formcraft_schema", JSON.stringify(schema));
            } catch (e) {
                console.warn("Could not save to localStorage:", e);
            }
        }, 400);

        // This make cleanup if the schema changes
        return () => {
            if (timer.current) clearTimeout(timer.current);
        };
    }, [schema]); // This run when the schema changes
};

export default useLocalStorage;