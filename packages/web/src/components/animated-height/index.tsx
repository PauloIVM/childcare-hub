import { useRef } from "react";
import { useResizeObserver } from "./hooks";

interface Props { children: React.ReactNode; }

export function AnimatedHeight({ children }: Props) {
    const content = useRef<HTMLDivElement | null>(null);
    const rect = useResizeObserver(content) as DOMRect;
  
    return (
        <div
            style={{
                transition: "0.3s",
                height: rect.height ? `${rect.height}px` : "auto",
                overflow: "hidden",
            }}
        >
            <div ref={content}>{children}</div>
        </div>
    );
}
