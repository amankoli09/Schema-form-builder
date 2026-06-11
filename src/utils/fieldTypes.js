export const FIELD_CATEGORIES = [
  {
    label: "Basic Fields",
    fields: [
      { type: "text", label: "Text Input", icon: "T" },
      { type: "email", label: "Email", icon: "@" },
      { type: "number", label: "Number", icon: "#" },
      { type: "textarea", label: "Long Text", icon: "📝" },
    ],
  },
  {
    label: "Choice Fields",
    fields: [
      { type: "select", label: "Dropdown", icon: "🔽" },
      { type: "radio", label: "Radio Group", icon: "🔘" },
      { type: "checkbox", label: "Checkbox", icon: "☑️" },
    ],
  },
  {
    label: "Advanced",
    fields: [
      { type: "date", label: "Date Picker", icon: "📅" },
      { type: "signature", label: "Signature", icon: "✍️" },
    ],
  },
];

export const FIELD_DEFAULTS = {
  text: { type: "text", label: "Text Input", placeholder: "Enter text" },
  email: { type: "email", label: "Email Address", placeholder: "you@example.com", validate: { isEmail: true } },
  number: { type: "number", label: "Number", placeholder: "0" },
  textarea: { type: "textarea", label: "Long Text", placeholder: "Enter details..." },
  select: { type: "select", label: "Dropdown", options: ["Option 1", "Option 2"] },
  radio: { type: "radio", label: "Radio Choice", options: ["Choice A", "Choice B"] },
  checkbox: { type: "checkbox", label: "Checkbox Item" },
  date: { type: "date", label: "Date Picker" },
  signature: { type: "signature", label: "Signature" },
};
