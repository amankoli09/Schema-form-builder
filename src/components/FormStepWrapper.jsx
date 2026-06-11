import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useFormSchema from "../hooks/useFormSchema";
import useFormValues from "../hooks/useFormValues";
import DynamicFieldRenderer from "./DynamicFieldRenderer";

// ── Sortable wrapper for each field on the canvas ──
function SortableField({ field, stepId, selectedFieldId, setSelectedFieldId }) {
  const { removeField } = useFormSchema();
  const { isVisible } = useFormValues();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  if (!isVisible(field)) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`canvas-field-wrapper ${selectedFieldId === field.id ? "selected" : ""}`}
      onClick={(e) => { e.stopPropagation(); setSelectedFieldId(field.id); }}
    >
      {/* Drag handle */}
      <div
        className="field-drag-handle"
        {...attributes}
        {...listeners}
        title="Drag to reorder"
      >
        ⠿
      </div>

      {/* Delete button */}
      <div className="field-actions">
        <button
          className="field-action-btn"
          title="Delete field"
          onClick={(e) => {
            e.stopPropagation();
            removeField(stepId, field.id);
            if (selectedFieldId === field.id) setSelectedFieldId(null);
          }}
        >
          🗑
        </button>
      </div>

      <DynamicFieldRenderer field={field} />
    </div>
  );
}

// ── Main FormStepWrapper ──
export default function FormStepWrapper({ stepId, selectedFieldId, setSelectedFieldId }) {
  const { getStep, schema } = useFormSchema();

  const { setNodeRef, isOver } = useDroppable({ id: `canvas-drop-${stepId}` });

  const step = getStep(stepId);
  if (!step) return null;

  const fieldIds = step.fields.map((f) => f.id);

  return (
    <div
      className="form-card"
      onClick={() => setSelectedFieldId(null)}
    >
      <div className="form-card-title">{schema?.title || "My Form"}</div>
      <div className="form-card-desc">{step.label}</div>

      {/* Droppable + sortable zone */}
      <div
        ref={setNodeRef}
        style={{ minHeight: 80 }}
      >
        {step.fields.length === 0 ? (
          <div className={`drop-zone-empty ${isOver ? "drop-zone-over" : ""}`}>
            {isOver ? "✅ Drop here to add field" : "👈 Click or drag a field from the left panel"}
          </div>
        ) : (
          <SortableContext items={fieldIds} strategy={verticalListSortingStrategy}>
            {step.fields.map((field) => (
              <SortableField
                key={field.id}
                field={field}
                stepId={stepId}
                selectedFieldId={selectedFieldId}
                setSelectedFieldId={setSelectedFieldId}
              />
            ))}
          </SortableContext>
        )}

        {/* Drop highlight when dragging over a non-empty canvas */}
        {isOver && step.fields.length > 0 && (
          <div className="drop-zone-over-hint">+ Drop to add field</div>
        )}
      </div>
    </div>
  );
}
