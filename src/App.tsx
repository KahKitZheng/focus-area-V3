import { useState } from "react";
import TourControls from "./components/TourControls";
import Spotlight from "./components/Spotlight";

interface TourStep {
  id: string;
  selector: string;
  title: string;
  description: string;
}

interface ZoomPanState {
  scale: number;
  translateX: number;
  translateY: number;
}

export default function SpotlightTourDemo() {
  const [zoomPan, setZoomPan] = useState<ZoomPanState>({
    scale: 1,
    translateX: 0,
    translateY: 0,
  });
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);

  const tourSteps: TourStep[] = [
    {
      id: "button1",
      selector: ".demo-button-1",
      title: "Demo Button 1",
      description:
        "This is the first button in our demo. It showcases basic functionality.",
    },
    {
      id: "input",
      selector: ".demo-input",
      title: "Input Field",
      description:
        "This input field allows users to enter text. Notice the clean design.",
    },
    {
      id: "card",
      selector: ".demo-card",
      title: "Demo Card",
      description:
        "This card component displays structured information in a visually appealing way.",
    },
    {
      id: "rounded",
      selector: ".demo-rounded",
      title: "Rounded Element",
      description:
        "This element demonstrates how the spotlight handles rounded corners.",
    },
  ];

  const zoomToElement = (selector: string): void => {
    const element = document.querySelector(selector);

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 80;

    const availableWidth = viewportWidth - padding * 2;
    const availableHeight = viewportHeight - padding * 2;

    setZoomPan((prevZoomPan: ZoomPanState): ZoomPanState => {
      const naturalWidth = rect.width / prevZoomPan.scale;
      const naturalHeight = rect.height / prevZoomPan.scale;

      const scaleToFitX = availableWidth / naturalWidth;
      const scaleToFitY = availableHeight / naturalHeight;
      const targetScale = Math.max(
        1.2,
        Math.min(Math.min(scaleToFitX, scaleToFitY), 4)
      );

      const scaledWidth = naturalWidth * targetScale;
      const scaledHeight = naturalHeight * targetScale;

      const viewportCenterX = viewportWidth / 2;
      const viewportCenterY = viewportHeight / 2;

      const targetLeft = viewportCenterX - scaledWidth / 2;
      const targetTop = viewportCenterY - scaledHeight / 2;

      const naturalLeft =
        (rect.left - prevZoomPan.translateX) / prevZoomPan.scale;
      const naturalTop =
        (rect.top - prevZoomPan.translateY) / prevZoomPan.scale;

      const translateX = targetLeft - naturalLeft * targetScale;
      const translateY = targetTop - naturalTop * targetScale;

      return {
        scale: targetScale,
        translateX,
        translateY,
      };
    });
  };

  const startTour = (): void => {
    setCurrentStepIndex(0);
    setIsTourActive(true);
    setTimeout(() => {
      zoomToElement(tourSteps[0].selector);
    }, 100);
  };

  const handleNext = (): void => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < tourSteps.length) {
      setCurrentStepIndex(nextIndex);
      setTimeout(() => {
        zoomToElement(tourSteps[nextIndex].selector);
      }, 100);
    }
  };

  const handlePrev = (): void => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStepIndex(prevIndex);
      setTimeout(() => {
        zoomToElement(tourSteps[prevIndex].selector);
      }, 100);
    }
  };

  const closeTour = (): void => {
    setIsTourActive(false);
    setZoomPan({ scale: 1, translateX: 0, translateY: 0 });
  };

  const currentStep: TourStep = tourSteps[currentStepIndex] || tourSteps[0];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `translate(${zoomPan.translateX}px, ${zoomPan.translateY}px) scale(${zoomPan.scale})`,
          transformOrigin: "0 0",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <div style={{ padding: "40px", minHeight: "100vh" }}>
          <h1>Spotlight Guided Tour Demo</h1>

          <div style={{ marginBottom: "30px" }}>
            <button
              onClick={startTour}
              type="button"
              style={{
                padding: "14px 28px",
                backgroundColor: "#007aff",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "16px",
                cursor: "pointer",
                boxShadow: "0 4px 12px rgba(0, 122, 255, 0.3)",
              }}
            >
              🚀 Start Guided Tour
            </button>
          </div>

          <div
            style={{
              display: "flex",
              gap: "30px",
              marginBottom: "40px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              className="demo-button-1"
              type="button"
              style={{
                padding: "16px 32px",
                backgroundColor: "#007aff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0, 122, 255, 0.2)",
              }}
            >
              Demo Button 1
            </button>

            <input
              className="demo-input"
              type="text"
              placeholder="Demo input field"
              style={{
                padding: "12px 16px",
                border: "2px solid #e1e5e9",
                borderRadius: "6px",
                width: "240px",
                fontSize: "15px",
              }}
            />
          </div>

          <div
            className="demo-card"
            style={{
              padding: "30px",
              border: "1px solid #e1e5e9",
              borderRadius: "12px",
              backgroundColor: "#f8f9fa",
              width: "350px",
              marginBottom: "40px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3 style={{ margin: "0 0 12px 0", color: "#333" }}>Demo Card</h3>
            <p style={{ margin: "0", color: "#666", lineHeight: "1.5" }}>
              This is a demo card that can be highlighted with the spotlight. It
              contains some example content to demonstrate the tour
              functionality.
            </p>
          </div>

          <div
            className="demo-rounded"
            style={{
              padding: "24px",
              border: "2px solid #ff6b6b",
              borderRadius: "24px",
              backgroundColor: "#ffe0e0",
              width: "280px",
              marginBottom: "40px",
              textAlign: "center",
            }}
          >
            <p
              style={{
                margin: "0 0 8px 0",
                fontWeight: "600",
                color: "#d63384",
              }}
            >
              Rounded Element
            </p>
            <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
              This element has rounded corners to test the spotlight&apos;s
              border radius handling.
            </p>
          </div>
        </div>
      </div>

      <Spotlight
        target={isTourActive ? currentStep.selector : null}
        isVisible={isTourActive}
        onClose={closeTour}
        padding={16}
      />

      <TourControls
        steps={tourSteps}
        currentStepIndex={currentStepIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        onClose={closeTour}
        isActive={isTourActive}
      />
    </div>
  );
}
