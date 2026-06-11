import { useState, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import BuilderSidebar, { FIELD_DEFAULTS } from "./components/BuilderSidebar";
import FormStage from "./components/FormStage";
import PropertyInspector from "./components/PropertyInspector";
import CodeMirrorTerminal from "./components/CodeMirrorTerminal";
import useFormSchema from "./hooks/useFormSchema";
import useLocalStorage from "./hooks/useLocalStorage";
import { exportSchemaAsJSON, importSchemaFromFile } from "./utils/exportJSON";
import { downloadReactComponent } from "./utils/exportReactCode";

export default function Builder({ onHome }) {
  useLocalStorage();

  const { schema, loadSchema, clearSchema, addNewField, reorderStepFields, getStep } = useFormSchema();
  const [selectedFieldId, setSelectedFieldId] = useState(null);
  const [activeStepId, setActiveStepId] = useState(schema?.steps?.[0]?.id);
  const [showJson, setShowJson] = useState(false);
  const [dragOverlay, setDragOverlay] = useState(null); // label of dragged chip
  const fileInputRef = useRef();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } })
  );

  const handleImport = (e) => {
    importSchemaFromFile(e, (parsed) => {
      loadSchema(parsed);
      setActiveStepId(parsed.steps[0]?.id);
      setSelectedFieldId(null);
    });
  };

  // ── DnD handlers ──
  const handleDragStart = (event) => {
    const { data } = event.active;
    if (data?.current?.fromSidebar) {
      setDragOverlay(data.current.fieldType);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setDragOverlay(null);

    if (!over) return;

    const activeData = active.data?.current;

    // Case 1: Dragged from sidebar → drop onto canvas
    if (activeData?.fromSidebar) {
      const fieldType = activeData.fieldType;
      const targetStepId = activeStepId;
      if (targetStepId) {
        addNewField(targetStepId, FIELD_DEFAULTS[fieldType]);
      }
      return;
    }

    // Case 2: Reordering existing fields
    const overId = over.id;
    const activeId = active.id;

    if (activeId !== overId) {
      const step = getStep(activeStepId);
      if (!step) return;
      const oldIndex = step.fields.findIndex((f) => f.id === activeId);
      const newIndex = step.fields.findIndex((f) => f.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reordered = arrayMove(step.fields, oldIndex, newIndex);
        reorderStepFields(activeStepId, reordered);
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="app-container">
        {/* ── Navbar ── */}
        <div className="navbar">
          <div className="builder-logo" onClick={onHome} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, fontWeight: 700, fontSize: 16, color: "#fff" }}>
            <div style={{ width: 28, height: 28, background: "#6366f1", borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
              </svg>
            </div>
            FormCraft
          </div>

          <div className="navbar-actions">
            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImport}
            />
            <button className="btn" onClick={() => fileInputRef.current.click()}>
              Import
            </button>
            <button className="btn" onClick={() => exportSchemaAsJSON(schema)}>
              Export JSON
            </button>

            <div className="navbar-sep" />

            <button
              className={`btn ${showJson ? "btn-accent" : ""}`}
              onClick={() => setShowJson((v) => !v)}
            >
              {showJson ? "Hide JSON" : "JSON Editor"}
            </button>

            <div className="navbar-sep" />

            <button className="btn btn-accent" onClick={() => downloadReactComponent(schema)}>
              Export React
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                if (window.confirm("Reset form? All fields will be deleted.")) {
                  clearSchema();
                  setSelectedFieldId(null);
                }
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* ── Builder Layout ── */}
        <div className="builder-layout">
          <BuilderSidebar activeStepId={activeStepId} />

          <FormStage
            activeStepId={activeStepId}
            setActiveStepId={setActiveStepId}
            selectedFieldId={selectedFieldId}
            setSelectedFieldId={setSelectedFieldId}
          />

          {/* Right panel: JSON editor OR Property inspector */}
          {showJson
            ? <CodeMirrorTerminal activeStepId={activeStepId} />
            : <PropertyInspector
                selectedFieldId={selectedFieldId}
                activeStepId={activeStepId}
              />
          }
        </div>
      </div>

      {/* Drag overlay — ghost label while dragging from sidebar */}
      <DragOverlay>
        {dragOverlay && (
          <div className="drag-ghost">
            + {FIELD_DEFAULTS[dragOverlay]?.label}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}