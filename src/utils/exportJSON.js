// This part will export the schema as a JSON file
export const exportSchemaAsJSON = (schema) => {

    // This is the json format of the schema
    const json = JSON.stringify(schema, null, 2);

    // Create a downloadable file in memory
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Create invisible link, click it, then remove it
    const link = document.createElement("a");
    link.href = url;
    link.download = `${schema.title || "form-schema"}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

export const importSchemaFromFile = (
    event,
    onSuccess,
    onError = (msg) => alert(msg)
) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        try {
            const parsed = JSON.parse(e.target.result);

            // Basic check — must have a steps array
            if (!parsed.steps || !Array.isArray(parsed.steps)) {
                onError("This file is not a valid form schema (missing steps).");
                return;
            }

            onSuccess(parsed);
        } catch {
            onError("Could not read file. Make sure it is a valid JSON file.");
        }
    };

    reader.onerror = () => onError("Failed to read the file.");
    reader.readAsText(file);

    // Reset file input so the same file can be re-imported if needed
    event.target.value = "";
};