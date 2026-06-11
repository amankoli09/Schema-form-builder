const fieldToJSX = ({ id, type, label, placeholder, validate, options }) => {
    const isReq = validate?.required ? " *" : "";
    let input = "";

    if (type === "textarea") {
        input = `<textarea name="${id}" placeholder="${placeholder || ""}" value={values.${id} || ""} onChange={handleChange} onBlur={handleBlur} />`;
    }
    else if (type === "select") {
        const opts = (options || []).map((o) => `<option value="${o}">${o}</option>`).join("");
        input = `<select name="${id}" value={values.${id} || ""} onChange={handleChange} onBlur={handleBlur}><option value="">Select...</option>${opts}</select>`;
    }
    else if (type === "checkbox") {
        input = `<input type="checkbox" name="${id}" checked={!!values.${id}} onChange={handleChange} />`;
    } else if (type === "radio") {
        input = (options || []).map((o) => `<label><input type="radio" name="${id}" value="${o}" checked={values.${id} === "${o}"} onChange={handleChange} /> ${o}</label>`).join(" ");
    } else {
        input = `<input type="${type || "text"}" name="${id}" placeholder="${placeholder || ""}" value={values.${id} || ""} onChange={handleChange} onBlur={handleBlur} />`;
    }

    return `
      <div>
        <label>${label}${isReq}</label>
        ${input}
        {errors.${id} && <span>{errors.${id}}</span>}
      </div>`;
};

export const generateReactComponent = (schema) => {
    const name = (schema.title || "MyForm").replace(/[^a-zA-Z0-9]/g, "") || "MyForm";
    const rules = {};

    schema.steps.forEach((step) => {
        step.fields.forEach((f) => {
            if (f.validate && Object.keys(f.validate).length > 0) rules[f.id] = f.validate;
        });
    });

    const stepsJSX = schema.steps.map((step, i) => `
    {step === ${i} && (
      <div>
        <h2>${step.label}</h2>
        ${step.fields.map(fieldToJSX).join("")}
      </div>
    )}`).join("\n");

    return `import { useState } from "react";

const RULES = ${JSON.stringify(rules, null, 2)};

const validate = (val, rules = {}) => {
  if (rules.required && !val) return "Required.";
  if (!val) return null;
  if (rules.isEmail && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val)) return "Invalid email.";
  if (rules.minLength && val.length < rules.minLength) return \`Min \${rules.minLength} chars.\`;
  return null;
};

export default function ${name}() {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setValues((p) => ({ ...p, [name]: val }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: validate(val, RULES[name]) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((p) => ({ ...p, [name]: validate(value, RULES[name]) }));
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, ${schema.steps.length - 1}));
  const handleBack = () => setStep((s) => Math.max(s - 0, 0));
  const handleSubmit = (e) => { e.preventDefault(); console.log(values); };

  return (
    <form onSubmit={handleSubmit}>
${stepsJSX}
      <div>
        {step > 0 && <button type="button" onClick={handleBack}>Back</button>}
        {step < ${schema.steps.length - 1}
          ? <button type="button" onClick={handleNext}>Next</button>
          : <button type="submit">Submit</button>
        }
      </div>
    </form>
  );
}`;
};

export const downloadReactComponent = (schema) => {
    const code = generateReactComponent(schema);
    const name = (schema.title || "MyForm").replace(/[^a-zA-Z0-9]/g, "") || "MyForm";
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${name}.jsx`;
    link.click();
    URL.revokeObjectURL(url);
};
