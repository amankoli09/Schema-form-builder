import useFormValues from "../hooks/useFormValues";

export default function DynamicFieldRenderer({ field }) {
  const { getValue, getError, handleChange, handleBlur } = useFormValues();

  const value = getValue(field.id);
  const error = getError(field.id);

  // Stop click from bubbling so clicking INSIDE an input
  // doesn't re-select the wrapper and lock the blue border
  const stopBubble = (e) => e.stopPropagation();

  const inputProps = {
    className: `field-input ${error ? "has-error" : ""}`,
    value: value,
    placeholder: field.placeholder || "",
    onChange: (e) => handleChange(field, e.target.value),
    onBlur: () => handleBlur(field),
    onClick: stopBubble,
  };

  const renderInput = () => {
    switch (field.type) {

      case "textarea":
        return (
          <textarea
            {...inputProps}
            rows={3}
            style={{ resize: "vertical", width: "100%" }}
          />
        );

      case "select":
        return (
          <select
            className={`field-input ${error ? "has-error" : ""}`}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            onBlur={() => handleBlur(field)}
            onClick={stopBubble}
          >
            <option value="">Select...</option>
            {(field.options || []).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <label
            onClick={stopBubble}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              color: "#374151",
              fontSize: 13,
              fontWeight: 400,
            }}
          >
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleChange(field, e.target.checked)}
              style={{ width: 16, height: 16, accentColor: "#6366f1" }}
            />
            {field.label}
          </label>
        );

      case "radio":
        return (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }} onClick={stopBubble}>
            {(field.options || []).map((opt) => (
              <label
                key={opt}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  color: "#374151",
                  fontSize: 13,
                }}
              >
                <input
                  type="radio"
                  name={field.id}
                  value={opt}
                  checked={value === opt}
                  onChange={(e) => handleChange(field, e.target.value)}
                  style={{ accentColor: "#6366f1" }}
                />
                {opt}
              </label>
            ))}
          </div>
        );

      case "number":
        return (
          <input
            type="number"
            {...inputProps}
            min={field.validate?.min}
            max={field.validate?.max}
          />
        );

      case "date":
        return <input type="date" {...inputProps} />;

      case "email":
        return <input type="email" {...inputProps} />;

      case "signature":
        return (
          <div
            onClick={stopBubble}
            style={{
              border: "1.5px dashed #d1d5db",
              borderRadius: 8,
              height: 80,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#b0b4bc",
              fontSize: 13,
              background: "#fafafa",
            }}
          >
            ✍️ Signature area
          </div>
        );

      default:
        return <input type="text" {...inputProps} />;
    }
  };

  return (
    <div className="field-group">
      {/* Label — skip for checkbox (it renders its own) */}
      {field.type !== "checkbox" && (
        <label className="field-label">
          {field.label}
          {field.validate?.required && <span className="field-required">*</span>}
          {field.conditions?.length > 0 && (
            <span className="field-tag">conditional</span>
          )}
        </label>
      )}

      {renderInput()}

      {error && <span className="field-error">⚠ {error}</span>}
    </div>
  );
}
