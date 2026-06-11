import useFormSchema from "../hooks/useFormSchema";
import FormStepWrapper from "./FormStepWrapper";

export default function FormStage({
  activeStepId,
  setActiveStepId,
  selectedFieldId,
  setSelectedFieldId,
}) {
  const { steps, addNewStep, removeStep } = useFormSchema();

  const handleRemoveStep = (e, stepId) => {
    e.stopPropagation();
    removeStep(stepId);
    if (stepId === activeStepId) {
      const remaining = (steps || []).filter((s) => s.id !== stepId);
      setActiveStepId(remaining[0]?.id);
    }
  };

  return (
    <div className="canvas">
      {/* Step tabs */}
      <div className="canvas-topbar">
        {/* Left: steps label + tabs + add button */}
        <div className="topbar-left">
          <span className="topbar-label">Steps</span>

          {(steps || []).map((step) => (
            <button
              key={step.id}
              className={`step-tab ${step.id === activeStepId ? "active" : ""}`}
              onClick={() => setActiveStepId(step.id)}
            >
              {step.label}
              {(steps || []).length > 1 && (
                <span
                  className="step-tab-x"
                  onClick={(e) => handleRemoveStep(e, step.id)}
                >
                  ×
                </span>
              )}
            </button>
          ))}

          <button
            className="btn-add-step"
            onClick={addNewStep}
          >
            + Add Step
          </button>
        </div>

        {/* Right: step counter clearly separated */}
        <div className="topbar-right">
          <div className="topbar-divider" />
          <span className="step-progress">
            Step {(steps || []).findIndex((s) => s.id === activeStepId) + 1} of {(steps || []).length}
          </span>
        </div>
      </div>

      {/* Canvas body */}
      <div className="canvas-body">
        {activeStepId && (
          <FormStepWrapper
            stepId={activeStepId}
            selectedFieldId={selectedFieldId}
            setSelectedFieldId={setSelectedFieldId}
          />
        )}
      </div>
    </div>
  );
}
