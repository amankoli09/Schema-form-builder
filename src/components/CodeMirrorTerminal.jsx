import { useState, useEffect } from "react";
import useFormSchema from "../hooks/useFormSchema";

export default function JsonTerminal({ activeStepId }) {
  const { schema, loadSchema } = useFormSchema();

  const [json, setJson] = useState("");
  const [error, setError] = useState(null);

  // When schema changes externally → update the textarea
  useEffect(() => {
    setJson(JSON.stringify(schema, null, 2));
    setError(null);
  }, [schema]);

  const handleChange = (e) => {
    const raw = e.target.value;
    setJson(raw);

    try {
      const parsed = JSON.parse(raw);
      // Validate it has at least a steps array
      if (parsed && Array.isArray(parsed.steps)) {
        setError(null);
        loadSchema(parsed);
      } else {
        setError("Schema must have a 'steps' array");
      }
    } catch {
      setError("Invalid JSON — keep typing...");
    }
  };

  return (
    <div className="json-terminal">
      <div className="json-terminal-header">
        <span className="json-terminal-title">📄 JSON Schema</span>
        {error
          ? <span className="json-terminal-error">{error}</span>
          : <span className="json-terminal-ok">✓ Valid</span>
        }
      </div>
      <textarea
        className="json-terminal-body"
        value={json}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  );
}
