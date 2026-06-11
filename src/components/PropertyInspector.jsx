import useFormSchema from "../hooks/useFormSchema";

export default function PropertyInspector({ selectedFieldId, activeStepId }) {
  const { getField, updateFieldConfig, steps } = useFormSchema();

  const field = selectedFieldId ? getField(selectedFieldId) : null;
  
  // Get all fields across all steps (for the conditions dropdown)
  const allFields = steps.flatMap(s => s.fields);

  const update = (changes) => {
    if (!field) return;
    updateFieldConfig(activeStepId, field.id, changes);
  };

  const updateValidate = (key, value) => {
    update({ validate: { ...field.validate, [key]: value } });
  };

  const updateCondition = (index, key, value) => {
    const conditions = [...(field.conditions || [])];
    conditions[index] = { ...conditions[index], [key]: value };
    update({ conditions });
  };

  const addCondition = () => {
    update({
      conditions: [
        ...(field.conditions || []),
        { fieldId: "", operator: "equals", value: "" },
      ],
    });
  };

  const removeCondition = (index) => {
    const conditions = (field.conditions || []).filter((_, i) => i !== index);
    update({ conditions });
  };

  if (!field) {
    return (
      <div className="inspector">
        <div className="inspector-header">
          <h3>Properties</h3>
        </div>
        <div className="inspector-empty">
          👆 Click any field on the canvas to edit its properties
        </div>
      </div>
    );
  }

  return (
    <div className="inspector">
      <div className="inspector-header">
        <h3>Field Settings</h3>
      </div>

      <div className="inspector-body">
        {/* Field Label */}
        <div className="prop-group">
          <div className="prop-label">Field Label</div>
          <input
            className="prop-input"
            value={field.label || ""}
            onChange={(e) => update({ label: e.target.value })}
            placeholder="Enter label..."
          />
        </div>

        {/* Placeholder */}
        {field.type !== "checkbox" && field.type !== "radio" && field.type !== "signature" && field.type !== "date" && (
          <div className="prop-group">
            <div className="prop-label">Placeholder Text</div>
            <input
              className="prop-input"
              value={field.placeholder || ""}
              onChange={(e) => update({ placeholder: e.target.value })}
              placeholder="Enter placeholder..."
            />
          </div>
        )}

        {/* Options for select / radio */}
        {(field.type === "select" || field.type === "radio") && (
          <div className="prop-group">
            <div className="prop-label">Options (one per line)</div>
            <textarea
              className="prop-input"
              rows={4}
              style={{ resize: "vertical" }}
              value={(field.options || []).join("\n")}
              onChange={(e) =>
                update({ options: e.target.value.split("\n").filter(Boolean) })
              }
            />
          </div>
        )}

        <hr className="prop-divider" />

        {/* Validation */}
        <div className="prop-section-title">Validation Rules</div>

        <label className="prop-checkbox-row prop-group">
          <input
            type="checkbox"
            checked={!!field.validate?.required}
            onChange={(e) => updateValidate("required", e.target.checked)}
          />
          Required field
        </label>

        {field.type === "email" && (
          <label className="prop-checkbox-row prop-group">
            <input
              type="checkbox"
              checked={!!field.validate?.isEmail}
              onChange={(e) => updateValidate("isEmail", e.target.checked)}
            />
            Must be valid email
          </label>
        )}

        {field.type === "text" && (
          <label className="prop-checkbox-row prop-group">
            <input
              type="checkbox"
              checked={!!field.validate?.isPhone}
              onChange={(e) => updateValidate("isPhone", e.target.checked)}
            />
            Must be valid phone number
          </label>
        )}

        {(field.type === "text" || field.type === "textarea" || field.type === "email") && (
          <div style={{ display: "flex", gap: 8 }}>
            <div className="prop-group" style={{ flex: 1 }}>
              <div className="prop-label">Min Length</div>
              <input
                className="prop-input"
                type="number"
                placeholder="0"
                value={field.validate?.minLength || ""}
                onChange={(e) => updateValidate("minLength", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
            <div className="prop-group" style={{ flex: 1 }}>
              <div className="prop-label">Max Length</div>
              <input
                className="prop-input"
                type="number"
                placeholder="∞"
                value={field.validate?.maxLength || ""}
                onChange={(e) => updateValidate("maxLength", e.target.value ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
        )}

        {field.type === "number" && (
          <div style={{ display: "flex", gap: 8 }}>
            <div className="prop-group" style={{ flex: 1 }}>
              <div className="prop-label">Min Value</div>
              <input
                className="prop-input"
                type="number"
                value={field.validate?.min ?? ""}
                onChange={(e) => updateValidate("min", e.target.value !== "" ? Number(e.target.value) : undefined)}
              />
            </div>
            <div className="prop-group" style={{ flex: 1 }}>
              <div className="prop-label">Max Value</div>
              <input
                className="prop-input"
                type="number"
                value={field.validate?.max ?? ""}
                onChange={(e) => updateValidate("max", e.target.value !== "" ? Number(e.target.value) : undefined)}
              />
            </div>
          </div>
        )}

        <div className="prop-group">
          <div className="prop-label">Pattern (Regex)</div>
          <input
            className="prop-input"
            placeholder="e.g. ^[A-Za-z]+$"
            value={field.validate?.pattern || ""}
            onChange={(e) => updateValidate("pattern", e.target.value || undefined)}
          />
        </div>

        <hr className="prop-divider" />

        {/* Conditional Visibility */}
        <div className="prop-section-title">Show this field only if...</div>

        {(field.conditions || []).map((cond, i) => (
          <div className="condition-row" key={i}>
            <div className="prop-label">Watch Field</div>
            <select
              className="prop-input"
              style={{ marginBottom: 8 }}
              value={cond.fieldId}
              onChange={(e) => updateCondition(i, "fieldId", e.target.value)}
            >
              <option value="">-- Select a field --</option>
              {allFields
                .filter(f => f.id !== field.id) // Don't allow watching itself
                .map(f => (
                  <option key={f.id} value={f.id}>
                    {f.label || "Untitled Field"}
                  </option>
              ))}
            </select>

            <div className="prop-label">Condition</div>
            <select
              className="prop-input"
              style={{ marginBottom: 8 }}
              value={cond.operator}
              onChange={(e) => updateCondition(i, "operator", e.target.value)}
            >
              <option value="equals">equals</option>
              <option value="notEquals">not equals</option>
              <option value="contains">contains</option>
              <option value="isEmpty">is empty</option>
              <option value="isNotEmpty">is not empty</option>
            </select>

            <div className="prop-label">Value</div>
            <input
              className="prop-input"
              style={{ marginBottom: 8 }}
              placeholder='e.g. "Married"'
              value={cond.value}
              onChange={(e) => updateCondition(i, "value", e.target.value)}
            />

            <button
              className="btn btn-danger"
              style={{ fontSize: 11.5, width: "100%", justifyContent: "center" }}
              onClick={() => removeCondition(i)}
            >
              Remove condition
            </button>
          </div>
        ))}

        <button
          className="btn"
          style={{ fontSize: 12, width: "100%", justifyContent: "center", marginTop: 4 }}
          onClick={addCondition}
        >
          + Add Condition
        </button>
      </div>
    </div>
  );
}
