type TourStep = {
  id: string;
  selector: string;
  title: string;
  description: string;
};

type TourControlsProps = {
  steps: TourStep[];
  currentStepIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  isActive: boolean;
};

export default function TourControls(props: TourControlsProps) {
  const { steps, currentStepIndex, onNext, onPrev, onClose, isActive } = props;

  if (!isActive || !steps[currentStepIndex]) {
    return null;
  }

  const currentStep = steps[currentStepIndex];
  const isFirst = currentStepIndex === 0;
  const isLast = currentStepIndex === steps.length - 1;

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    action: () => void
  ): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      action();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10000,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        maxWidth: "400px",
        width: "90%",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px", color: "#333" }}>
          {currentStep.title}
        </h3>
        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
          {currentStep.description}
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontSize: "12px",
            color: "#888",
            fontWeight: "500",
          }}
        >
          Step {currentStepIndex + 1} of {steps.length}
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={onPrev}
            onKeyDown={(e) => handleKeyDown(e, onPrev)}
            disabled={isFirst}
            type="button"
            aria-label="Previous step"
            style={{
              padding: "8px 16px",
              backgroundColor: isFirst ? "#e0e0e0" : "#f0f0f0",
              color: isFirst ? "#999" : "#333",
              border: "none",
              borderRadius: "6px",
              cursor: isFirst ? "not-allowed" : "pointer",
              fontSize: "14px",
            }}
          >
            Previous
          </button>

          <button
            onClick={isLast ? onClose : onNext}
            onKeyDown={(e) => handleKeyDown(e, isLast ? onClose : onNext)}
            type="button"
            aria-label={isLast ? "Finish tour" : "Next step"}
            style={{
              padding: "8px 16px",
              backgroundColor: "#007aff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            {isLast ? "Finish" : "Next"}
          </button>

          <button
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            type="button"
            aria-label="Close tour"
            style={{
              padding: "8px 12px",
              backgroundColor: "transparent",
              color: "#666",
              border: "1px solid #ddd",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
