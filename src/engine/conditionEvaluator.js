const normalize = (val) => {
  if (val === true) return "true yes checked";
  if (val === false) return "false no unchecked";
  return String(val).toLowerCase();
};

const check = {
  equals: (a, b) => normalize(a).includes(String(b).toLowerCase()),
  notEquals: (a, b) => !normalize(a).includes(String(b).toLowerCase()),
  contains: (a, b) => normalize(a).includes(String(b).toLowerCase()),
  isEmpty: (a) => a === "" || a === null || a === undefined || a === false,
  isNotEmpty: (a) => a !== "" && a !== null && a !== undefined && a !== false,
};

export const shouldShowField = (field, formValues) => {
  if (!field.conditions || field.conditions.length === 0) return true;
  return field.conditions.every((cond) => {
    const liveValue = formValues[cond.fieldId];
    const evaluator = check[cond.operator];
    if (!evaluator) return true;
    return evaluator(liveValue, cond.value);
  });
};