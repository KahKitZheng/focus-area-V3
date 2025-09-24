import { useState, useRef, useEffect } from "react";

type SpotlightDimensions = {
  top: number;
  left: number;
  width: number;
  height: number;
};

type SpotlightProps = {
  target: string | null;
  isVisible?: boolean;
  onClose?: () => void;
  maskColor?: string;
  padding?: number;
};

export default function Spotlight(props: Readonly<SpotlightProps>) {
  const {
    target,
    isVisible = false,
    onClose,
    maskColor = "rgba(0, 0, 0, 0.35)",
    padding = 0,
  } = props;

  const [dimensions, setDimensions] = useState<SpotlightDimensions | null>(
    null
  );
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isVisible || !target) {
      setDimensions(null);
      return;
    }

    const updateDimensions = (): void => {
      const element = document.querySelector(target);
      if (!element) return;

      const rect = element.getBoundingClientRect();
      setDimensions({
        top: rect.top - padding,
        left: rect.left - padding,
        width: rect.width + padding * 2,
        height: rect.height + padding * 2,
      });
    };

    updateDimensions();

    const animate = (): void => {
      updateDimensions();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target, isVisible, padding]);

  if (!isVisible || !dimensions) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose?.();
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: maskColor,
        clipPath: `polygon(
          0% 0%, 
          0% 100%, 
          ${dimensions.left}px 100%, 
          ${dimensions.left}px ${dimensions.top}px, 
          ${dimensions.left + dimensions.width}px ${dimensions.top}px, 
          ${dimensions.left + dimensions.width}px ${
          dimensions.top + dimensions.height
        }px, 
          ${dimensions.left}px ${dimensions.top + dimensions.height}px, 
          ${dimensions.left}px 100%, 
          100% 100%, 
          100% 0%
        )`,
        cursor: "pointer",
      }}
      onClick={onClose}
      aria-label="Close spotlight"
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  );
}
