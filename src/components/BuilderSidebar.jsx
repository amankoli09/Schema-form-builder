import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import useFormSchema from "../hooks/useFormSchema";

const FIELD_CATEGORIES = [
  {
    label: "Text & Input",
    fields: [
      { type: "text",      label: "Short Text",    icon: "Aa" },
      { type: "textarea",  label: "Paragraph",     icon: "¶"  },
      { type: "number",    label: "Numeric Input",  icon: "#"  },
      { type: "date",      label: "Date Picker",   icon: "📅" },
      { type: "email",     label: "Email",          icon: "@"  },
    ],
  },
  {
    label: "Selection & Choices",
    fields: [
      { type: "select",   label: "Dropdown Menu",  icon: "▾" },
      { type: "radio",    label: "Single Choice",  icon: "◎" },
      { type: "checkbox", label: "Checkbox Group", icon: "☑" },
    ],
  },
  {
    label: "Advanced",
    fields: [
      { type: "signature", label: "Signature Pad", icon: "✍" },
    ],
  },
];

export const FIELD_DEFAULTS = {
  text:      { type: "text",      label: "Short Text",    placeholder: "Enter text..." },
  textarea:  { type: "textarea",  label: "Paragraph",     placeholder: "Enter details..." },
  number:    { type: "number",    label: "Numeric Input",  placeholder: "0" },
  date:      { type: "date",      label: "Date Picker" },
  email:     { type: "email",     label: "Email Address", placeholder: "you@example.com", validate: { isEmail: true } },
  select:    { type: "select",    label: "Dropdown Menu", options: ["Option 1", "Option 2"] },
  radio:     { type: "radio",     label: "Single Choice", options: ["Choice A", "Choice B"] },
  checkbox:  { type: "checkbox",  label: "Checkbox Item" },
  signature: { type: "signature", label: "Signature Pad" },
};

// Individual draggable chip
function DraggableChip({ field, activeStepId }) {
  const { addNewField } = useFormSchema();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `sidebar-${field.type}`,
    data: { fromSidebar: true, fieldType: field.type },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="field-chip"
      // Also allow click-to-add as fallback
      onClick={() => {
        if (!activeStepId) return;
        addNewField(activeStepId, FIELD_DEFAULTS[field.type]);
      }}
      title={`Click or drag to add ${field.label}`}
    >
      <div className="field-chip-icon">{field.icon}</div>
      <span>{field.label}</span>
    </div>
  );
}

export default function BuilderSidebar({ activeStepId }) {
  return (
    <div className="sidebar">
      <div className="sidebar-header">Form Elements</div>

      <input
        className="sidebar-search"
        type="text"
        placeholder="🔍  Search field..."
        readOnly
      />

      {FIELD_CATEGORIES.map((cat) => (
        <div key={cat.label}>
          <div className="sidebar-section-label">{cat.label}</div>
          {cat.fields.map((f) => (
            <DraggableChip
              key={f.type}
              field={f}
              activeStepId={activeStepId}
            />
          ))}
          <div className="sidebar-divider" />
        </div>
      ))}
    </div>
  );
}
